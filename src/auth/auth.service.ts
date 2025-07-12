import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { HashingService } from './hashing.service';
import { JwtConfig } from '../common/config/jwt.config';
import { ActiveUserData } from '../common/interfaces';
import {
  RequestOtpDto,
  ValidateOtpDto,
  RefreshTokenDto,
  LogoutDto,
  LoginResponseDto,
} from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export class InvalidateRefreshTokenError extends Error {}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly hashingService: HashingService,
    @Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
  ) {}

  async requestOtp(requestOtpDto: RequestOtpDto) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        email: requestOtpDto.email.toLowerCase().trim(),
        isActive: true,
      },
      select: {
        email: true,
        firstName: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Delete existing OTP for this email
    await this.prisma.otp.deleteMany({
      where: { email: requestOtpDto.email },
    });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send OTP via email
    const mail = await this.otpService.sendOTP(
      requestOtpDto.email.toLowerCase(),
      employee.firstName,
      otp,
    );

    return { employee, mail };
  }

  async validateOtp(validateOtpDto: ValidateOtpDto): Promise<LoginResponseDto> {
    const { email, otp } = validateOtpDto;

    const employee = await this.prisma.employee.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        isActive: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const isValidOtp = await this.otpService.validateOTP(
      email.toLowerCase(),
      otp,
    );

    if (!isValidOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return await this.generateTokens(employee);
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<LoginResponseDto> {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const employee = await this.prisma.employee.findFirst({
        where: { id: sub },
      });

      if (!employee) {
        throw new NotFoundException('Employee not found');
      }

      const isValid = await this.findRefreshToken(employee.id, refreshTokenId);

      if (isValid) {
        // Delete the used refresh token
        await this.prisma.refreshToken.deleteMany({
          where: {
            userId: employee.id,
            refreshTokenId: refreshTokenId,
          },
        });
      } else {
        throw new InvalidateRefreshTokenError();
      }

      return this.generateTokens(employee);
    } catch (err) {
      if (err instanceof InvalidateRefreshTokenError) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Clean up invalid refresh tokens
      await this.prisma.refreshToken.deleteMany({
        where: { userId: parseInt(refreshTokenDto.employeeId) },
      });

      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(logoutDto: LogoutDto) {
    const { refreshTokenId } = await this.jwtService.verifyAsync(
      logoutDto.refreshToken,
      {
        secret: this.jwtConfiguration.secret,
      },
    );

    await this.prisma.refreshToken.deleteMany({
      where: { 
        userId: parseInt(logoutDto.employeeId), 
        refreshTokenId: refreshTokenId 
      },
    });

    return { success: true, message: 'Logout successful' };
  }

  private async findRefreshToken(userId: number, tokenId: string): Promise<boolean> {
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: {
        userId: userId,
        refreshTokenId: tokenId,
      },
    });

    if (!storedToken || storedToken.refreshTokenId !== tokenId) {
      throw new InvalidateRefreshTokenError();
    }

    return storedToken.refreshTokenId === tokenId;
  }

  private async generateTokens(employee: any): Promise<LoginResponseDto> {
    const refreshTokenId = randomUUID();
    const { firstName, employeeCode, email } = employee;

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(employee.id, this.jwtConfiguration.accessTokenTtl, {
        firstName,
        employeeCode,
        email,
      }),
      this.signToken(employee.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);

    // Store refresh token in database
    await this.prisma.refreshToken.create({
      data: { userId: employee.id, refreshTokenId },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: employee.id,
        email: employee.email,
        firstName: employee.firstName,
        employeeCode: employee.employeeCode,
        role: employee.role,
      },
    };
  }

  private async signToken<T>(id: number, expiresIn: number, payload?: T): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: id,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
} 
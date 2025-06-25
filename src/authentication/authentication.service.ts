import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { LogInDto } from './dto/log-in.dto';
import { RequestOTPDto } from './dto/request-otp.dto';
import { ValidateOTP } from './dto/validate-otp.dto';
import { HashingService } from './hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from './interfaces/active-userdata-interface';
import { randomUUID } from 'crypto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { OtpService } from './otp.service';
import { LogoutDto } from './dto/logout.dto';

export class InvalidateRefreshTokenError extends Error {}

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly otpService: OtpService,
  ) {}

  // async login(logInDto: LogInDto) {
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       email: logInDto.email,
  //       isActive: true,
  //     },
  //   });

  //   if (!user) {
  //     return new UnauthorizedException('User Not Found');
  //   }

  //   const isEqual = await this.hashingService.compare(
  //     logInDto.password,
  //     user.password,
  //   );

  //   if (!isEqual) {
  //     return new UnauthorizedException('Password Does Not Match');
  //   } else {
  //     const user = await this.prisma.user.findFirst({
  //       where: {
  //         email: logInDto.email,
  //       },
  //       select: {
  //         id: true,
  //         email: true,
  //         role: true,
  //         username: true,
  //         image: true,
  //         isActive: true,
  //       },
  //     });

  //     return await this.generateTokens(user);
  //   }
  // }

  async requestOtp(requestOTPDto: RequestOTPDto) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        email: requestOTPDto.email.toLowerCase().trim(),
        isActive: true,
      },
      select: {
        email: true,
        firstName: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee Not Found');
    }

    const otpExist = await this.prisma.otp.findFirst({
      where: {
        email: requestOTPDto.email,
      },
    });

    if (otpExist) {
      await this.prisma.otp.deleteMany({
        where: { email: requestOTPDto.email },
      });
    }

    const mail = await this.otpService.sendOTP(
      String(requestOTPDto.email.toLowerCase()),
      employee.firstName,
      Math.floor(100000 + Math.random() * 900000).toString(),
    );

    return { employee, mail };
  }

  async validateOtp(validateOTP: ValidateOTP) {
    const { email, otp, deviceId, fireBaseMobToken, fireBaseWebToken } =
      validateOTP;

    const user = await this.prisma.employee.findFirst({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (user === null) {
      throw new NotFoundException('Employee Not Found');
    }

    const res = await this.otpService.validateOTP(
      String(email.toLowerCase()),
      otp,
    );

    if (res) {
      return await this.generateTokens(user);
    } else {
      return { suceess: false, message: 'OTP not Match' };
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
      where: { userId: +logoutDto.employeeId, refreshTokenId: refreshTokenId },
    });

    return { suceess: 200, message: 'Logout Successful' };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.prisma.employee.findFirst({
        where: { id: sub },
      });

      const isValid = await this.findRefreshToken(user.id, refreshTokenId);

      if (isValid) {
        await this.prisma.refreshToken.deleteMany({
          where: {
            userId: user.id,
            refreshTokenId: refreshTokenId,
          },
        });
      } else {
        throw new Error('Refresh Token Is Invalidate');
      }

      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidateRefreshTokenError) {
        throw new UnauthorizedException('Invalid Refresh Token Access denied');
      }

      await this.prisma.refreshToken.deleteMany({
        where: { userId: refreshTokenDto.employeeId },
      });

      throw new UnauthorizedException();
    }
  }

  async findRefreshToken(id: number, tokenId: string) {
    const storedId = await this.prisma.refreshToken.findFirst({
      where: {
        userId: id,
        refreshTokenId: tokenId,
      },
    });

    if (storedId.refreshTokenId !== tokenId) {
      throw new InvalidateRefreshTokenError();
    }

    return storedId.refreshTokenId === tokenId;
  }

  async generateTokens(user: any) {
    const refreshTokenId = randomUUID();
    const data = user;
    const { firstName, employeeCode, email } = data;

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        firstName,
        employeeCode,
        email,
      }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);

    await this.prisma.refreshToken.create({
      data: { userId: user.id, refreshTokenId },
    });

    const { password, ...rest } = user;

    return {
      accessToken,
      refreshToken,
      user: rest,
    };
  }

  private async signToken<T>(id: string, expiresIn: number, payload?: T) {
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

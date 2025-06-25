import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { MailService } from './mail.service';

@Injectable()
export class OtpService {
  constructor(
    private readonly mailService: MailService,
    private prisma: PrismaService,
  ) {}

  async sendOTP(email: string, firstName: string, otp: string): Promise<any> {
    await this.prisma.otp.create({ data: { email, otp } });
    return this.mailService.sendOtpMail(email, firstName, String(otp));
  }

  async validateOTP(email: string, otp: string): Promise<any> {
    const storedOtp = await this.prisma.otp.findFirst({
      where: { email, otp },
    });

    if (storedOtp === null) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'OTP mismatch or invalid OTP provided',
        error: 'Bad Request',
      });
    }

    await this.prisma.otp.deleteMany({ where: { email, otp } });

    return storedOtp.otp === otp;
  }
}

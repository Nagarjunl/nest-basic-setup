import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from './mail.service';

@Injectable()
export class OtpService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async sendOTP(email: string, firstName: string, otp: string) {
    // Store OTP in database
    await this.prisma.otp.create({
      data: {
        email: email.toLowerCase(),
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // Send OTP via email
    return await this.mailService.sendOtpEmail(email, firstName, otp);
  }

  async validateOTP(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this.prisma.otp.findFirst({
      where: {
        email: email.toLowerCase(),
        otp,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!storedOtp) {
      return false;
    }

    // Delete the used OTP
    await this.prisma.otp.delete({
      where: { id: storedOtp.id },
    });

    return true;
  }
} 
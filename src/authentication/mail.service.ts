import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpMail(
    email: string,
    firstName: string,
    otp: string,
  ): Promise<void> {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: 'Zone Login OTP',
        template: 'otpmail',
        context: {
          otp: otp,
          firstName: firstName,
        },
      });
    } catch (error) {
      throw new Error(`Failed to send OTP email: ${error.message}`);
    }
  }
}

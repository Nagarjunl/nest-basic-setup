import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(email: string, firstName: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your OTP Code',
        template: 'otpmail',
        context: {
          firstName,
          otp,
        },
      });

      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send OTP', error };
    }
  }

  async sendWelcomeEmail(email: string, firstName: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Our Platform',
        template: 'welcome',
        context: {
          firstName,
        },
      });

      return { success: true, message: 'Welcome email sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send welcome email', error };
    }
  }
} 
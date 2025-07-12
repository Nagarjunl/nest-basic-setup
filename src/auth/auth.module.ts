import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Controllers
import { AuthController } from './auth.controller';

// Services
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { HashingService } from './hashing.service';

// Guards
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { RolesGuard } from '../common/guards/auth/roles.guard';

// Modules
import { CommonModule } from '../common/module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          port: configService.get('mail.port'),
          secure: configService.get('mail.secure'),
          auth: {
            user: configService.get('mail.user'),
            pass: configService.get('mail.password'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        template: {
          dir: join(__dirname, '../../', 'mailtemplates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OtpService,
    MailService,
    HashingService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService, HashingService],
})
export class AuthModule {} 
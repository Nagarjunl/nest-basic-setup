import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { OtpService } from './otp.service';
import { MailService } from './mail.service';
import { RolesGuard } from './authorization/guards/roles/roles.guard';
// import { BasicAuthGuard } from './guards/basic-auth/basic-auth.guard';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    AccessTokenGuard,
    // BasicAuthGuard,
    OtpService,
    MailService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  imports: [
    PrismaModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
})
export class AuthenticationModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Core modules
import { CommonModule } from './common/module';

// Feature modules
import { AuthModule } from './auth/auth.module';

// Configuration
import { AppConfig, DatabaseConfig, MailConfig } from './config/app.config';

// Controllers and services
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AppConfig, DatabaseConfig, MailConfig],
    }),

    // Database
    PrismaModule,

    // Common functionality
    CommonModule,

    // Feature modules
    AuthModule,

    // Static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
    }),

    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Request OTP DTO
export class RequestOtpDto {
  @ApiProperty({ description: 'Email address for OTP' })
  @IsEmail()
  email: string;
}

// Validate OTP DTO
export class ValidateOtpDto {
  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'OTP code' })
  @IsString()
  otp: string;

  @ApiPropertyOptional({ description: 'Device ID' })
  @IsOptional()
  @IsString()
  deviceId?: string;

  @ApiPropertyOptional({ description: 'Firebase mobile token' })
  @IsOptional()
  @IsString()
  fireBaseMobToken?: string;

  @ApiPropertyOptional({ description: 'Firebase web token' })
  @IsOptional()
  @IsString()
  fireBaseWebToken?: string;
}

// Refresh token DTO
export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsString()
  refreshToken: string;

  @ApiProperty({ description: 'Employee ID' })
  @IsString()
  employeeId: string;
}

// Logout DTO
export class LogoutDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsString()
  refreshToken: string;

  @ApiProperty({ description: 'Employee ID' })
  @IsString()
  employeeId: string;
}

// Login response DTO
export class LoginResponseDto {
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'User information' })
  user: {
    id: number;
    email: string;
    firstName?: string;
    employeeCode?: string;
    role?: string;
  };
} 
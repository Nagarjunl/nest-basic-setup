import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ValidateOTP {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  otp: string;

  @ApiProperty()
  deviceId: string;

  @ApiProperty({ required: false })
  fireBaseMobToken: string;

  @ApiProperty({ required: false })
  fireBaseWebToken: string;
}

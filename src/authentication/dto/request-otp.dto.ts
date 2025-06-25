import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RequestOTPDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}

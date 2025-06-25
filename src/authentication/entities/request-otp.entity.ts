import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RequestOTPEntity {
  @IsNotEmpty()
  email: string;
}

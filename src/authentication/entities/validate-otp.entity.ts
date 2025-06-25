import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ValidateOTPEntity {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    otp: string;
}

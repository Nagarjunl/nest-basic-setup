import { ApiProperty } from "@nestjs/swagger";

export class LogInEntity {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  refreshToken: string;
}

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { LogInDto } from './dto/log-in.dto';
import { RequestOTPDto } from './dto/request-otp.dto';
import { ValidateOTP } from './dto/validate-otp.dto';
import { Auth } from './decorators/auth.decorators';
import { AuthType } from './enums/auth-type.enums';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';

@Auth(AuthType.None)
@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // @Post('/login')
  // @ApiCreatedResponse({ type: LogInDto })
  // login(@Body() logInDto: LogInDto) {
  //   return this.authenticationService.login(logInDto);
  // }

  @Post('request-otp')
  @ApiCreatedResponse({ type: RequestOTPDto })
  requestOtp(@Body() requestOTPDto: RequestOTPDto) {
    return this.authenticationService.requestOtp(requestOTPDto);
  }

  @Post('validate-otp')
  @ApiCreatedResponse({ type: ValidateOTP })
  validateOtp(@Body() validateOTP: ValidateOTP) {
    return this.authenticationService.validateOtp(validateOTP);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  @ApiCreatedResponse({ type: RefreshTokenDto })
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationService.refreshTokens(refreshTokenDto);
  }

  @Post('logout')
  @ApiCreatedResponse({ description: 'User logged out successfully' })
  logout(@Body() logoutDto: LogoutDto) {
    return this.authenticationService.logout(logoutDto);
  }
}

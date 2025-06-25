// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Request } from 'express';
// import { HashingService } from 'src/authentication/hashing/hashing.service';

// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class BasicAuthGuard implements CanActivate {
//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly hashingService: HashingService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();

//     // Get Authorization header
//     const authHeader = request.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Basic ')) {
//       throw new UnauthorizedException(
//         'Missing or invalid Authorization header',
//       );
//     }

//     // Decode Base64 (Basic Auth format is "Basic base64(username:password)")
//     const base64Credentials = authHeader.split(' ')[1];
//     const credentials = Buffer.from(base64Credentials, 'base64').toString(
//       'utf-8',
//     );
//     const [username, password] = credentials.split(':');

//     if (!username || !password) {
//       throw new UnauthorizedException('Invalid Basic Auth credentials');
//     }

//     const apiUser = await this.prisma.apiUser.findFirst({
//       where: { email: username, isActive: true },
//     });

//     if (!apiUser) {
//       throw new UnauthorizedException('User Not Found');
//     }

//     const isValid = await this.hashingService.compare(
//       password,
//       apiUser.password,
//     );

//     if (!isValid) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     // Attach user to request object
//     request['user'] = apiUser;
//     return true;
//   }
// }

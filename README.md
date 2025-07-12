<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Basic Setup

A well-structured NestJS application with authentication, authorization, and user management features.

## 🚀 Features

- **Authentication System**
  - OTP-based authentication
  - JWT access and refresh tokens
  - Email notifications
  - Secure password hashing

- **Authorization System**
  - Role-based access control (RBAC)
  - Custom guards and decorators
  - Flexible permission system

- **User Management**
  - CRUD operations for users/employees
  - Pagination support
  - Email validation
  - User activation/deactivation

- **Database Integration**
  - Prisma ORM with PostgreSQL
  - Type-safe database operations
  - Migration management

- **API Documentation**
  - Swagger/OpenAPI integration
  - Comprehensive endpoint documentation
  - Request/response schemas

## 📁 Project Structure

```
src/
├── common/                    # Shared functionality
│   ├── config/               # Configuration files
│   ├── constants/            # Application constants
│   ├── decorators/           # Custom decorators
│   ├── enums/                # Application enums
│   ├── guards/               # Authentication & authorization guards
│   ├── interfaces/           # TypeScript interfaces
│   └── module.ts             # Common module
├── config/                   # Application configuration
├── database/                 # Database layer
│   ├── prisma.service.ts     # Prisma service
│   └── database.module.ts    # Database module
├── modules/                  # Feature modules
│   ├── auth/                 # Authentication module
│   │   ├── controllers/      # Auth controllers
│   │   ├── dto/             # Auth DTOs
│   │   ├── services/        # Auth services
│   │   └── auth.module.ts   # Auth module
│   └── users/               # Users module
│       ├── controllers/     # User controllers
│       ├── dto/            # User DTOs
│       ├── services/       # User services
│       └── users.module.ts # Users module
├── app.controller.ts        # Main app controller
├── app.module.ts           # Main app module
├── app.service.ts          # Main app service
└── main.ts                # Application entry point
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nest-basic-setup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables in `.env`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_TOKEN_AUDIENCE="localhost:3000"
   JWT_TOKEN_ISSUER="auth-service"
   JWT_ACCESS_TOKEN_TTL="900"
   JWT_REFRESH_TOKEN_TTL="86400"
   
   # Email
   ADMIN_EMAIL="your-email@gmail.com"
   EMAIL_PASSWORD="your-app-password"
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   
   # Application
   PORT="3000"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## 🔐 Authentication Endpoints

### Request OTP
```http
POST /auth/request-otp
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Validate OTP
```http
POST /auth/validate-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token",
  "employeeId": "1"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token",
  "employeeId": "1"
}
```

## 👥 User Management Endpoints

### Create User (Admin only)
```http
POST /users
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": "Employee"
}
```

### Get All Users
```http
GET /users?page=1&limit=10&sortBy=firstName&sortOrder=asc
Authorization: Bearer your-access-token
```

### Get User by ID
```http
GET /users/1
Authorization: Bearer your-access-token
```

### Update User
```http
PUT /users/1
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "firstName": "Jane",
  "email": "jane.doe@example.com"
}
```

### Delete User
```http
DELETE /users/1
Authorization: Bearer your-access-token
```

## 🔧 Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🏗️ Architecture Patterns

### Module Structure
- **Feature-based modules**: Each feature has its own module with controllers, services, and DTOs
- **Shared modules**: Common functionality is organized in shared modules
- **Dependency injection**: Proper use of NestJS DI container

### Authentication & Authorization
- **Guards**: Custom guards for authentication and role-based access
- **Decorators**: Custom decorators for route protection and user extraction
- **JWT**: Secure token-based authentication with refresh tokens
- **OTP**: Email-based one-time password authentication

### Database Layer
- **Prisma ORM**: Type-safe database operations
- **Migrations**: Version-controlled database schema changes
- **Service layer**: Business logic separated from data access

### API Design
- **RESTful endpoints**: Standard REST API design
- **DTOs**: Data transfer objects for request/response validation
- **Swagger documentation**: Comprehensive API documentation
- **Error handling**: Consistent error responses

## 🔒 Security Features

- **Password hashing**: Bcrypt for secure password storage
- **JWT tokens**: Secure token-based authentication
- **Role-based access**: Fine-grained permission control
- **Input validation**: Request validation using class-validator
- **CORS protection**: Cross-origin resource sharing protection
- **Rate limiting**: Protection against brute force attacks

## 🧪 Testing

The application includes:
- Unit tests for services and controllers
- End-to-end tests for API endpoints
- Test coverage reporting

Run tests with:
```bash
npm run test
npm run test:e2e
npm run test:cov
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

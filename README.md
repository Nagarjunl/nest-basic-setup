<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Basic Starter

A public, production-ready NestJS starter template with authentication, authorization, user management, and Prisma integration. Use this as a foundation for your own Node.js backend projects.

---

## 🚀 Features

- **Authentication**: OTP-based login, JWT access/refresh tokens, secure password hashing
- **Authorization**: Role-based access control (RBAC), custom guards and decorators
- **User Management**: CRUD, pagination, activation/deactivation, email validation
- **Database**: Prisma ORM (PostgreSQL by default), migrations, type-safe queries
- **API Docs**: Swagger/OpenAPI auto-generated documentation
- **Testing**: Unit and e2e tests, coverage reporting
- **Security**: Bcrypt, input validation, CORS, rate limiting

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example env file and edit as needed:
```bash
cp .env.example .env
```
Edit `.env` with your database, JWT, and email credentials.

### 4. Set Up the Database
```bash
npx prisma generate
npx prisma migrate dev
# (Optional) npx prisma db seed
```

### 5. Run the App
```bash
# Development
npm run start:dev
# Production
npm run build && npm run start:prod
```

---

## 📚 API Documentation

Once running, access Swagger UI at:
```
http://localhost:3000/api
```

---

## 🔐 Authentication & User Endpoints (Examples)

### Request OTP
```http
POST /auth/request-otp
{
  "email": "user@example.com"
}
```

### Validate OTP
```http
POST /auth/validate-otp
{
  "email": "user@example.com",
  "otp": "123456"
}
```

### Refresh Token
```http
POST /auth/refresh
{
  "refreshToken": "...",
  "employeeId": "1"
}
```

### User CRUD (Admin)
```http
POST /users
Authorization: Bearer <token>
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": "Employee"
}
```

---

## 📁 Project Structure (Simplified)

```
src/
├── app.module.ts
├── app.controller.ts
├── app.service.ts
├── main.ts
├── auth/           # Auth logic (OTP, JWT, guards)
├── clients/        # Example feature module
├── common/         # Shared code (guards, decorators, enums, etc.)
├── config/         # App config
├── prisma/         # Prisma service/module
```

---

## 🔧 Scripts
- `npm run start:dev` – Start dev server
- `npm run build` – Build app
- `npm run start:prod` – Run production
- `npm run test` – Unit tests
- `npm run test:e2e` – End-to-end tests
- `npm run lint` – Lint code
- `npm run format` – Format code

---

## 🏗️ Architecture
- **Feature-based modules**
- **Dependency injection**
- **Custom guards & decorators**
- **Prisma ORM**
- **RESTful API design**
- **Swagger docs**

---

## 🔒 Security
- Password hashing (bcrypt)
- JWT authentication
- Role-based access
- Input validation
- CORS & rate limiting

---

## 🧪 Testing
```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:cov    # Coverage
```

---

## 📝 Contributing
1. Fork this repo
2. Create a feature branch
3. Make changes & add tests
4. Ensure all tests pass
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Credits

- Built with [NestJS](https://nestjs.com/)
- Inspired by the open source community

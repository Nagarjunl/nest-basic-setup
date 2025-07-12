# Configuration Guide

This document explains how to configure the NestJS Basic Setup application.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Database Configuration
```env
DATABASE_URL="postgresql://username:password@localhost:5432/nest_basic_setup"
```

### JWT Configuration
```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_TOKEN_AUDIENCE="localhost:3000"
JWT_TOKEN_ISSUER="auth-service"
JWT_ACCESS_TOKEN_TTL="900"
JWT_REFRESH_TOKEN_TTL="86400"
```

### Email Configuration
```env
ADMIN_EMAIL="your-email@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
```

### Application Configuration
```env
PORT="3000"
NODE_ENV="development"
APP_NAME="NestJS Basic Setup"
APP_VERSION="1.0.0"
```

### Optional: Logging
```env
LOG_LEVEL="debug"
```

## Database Setup

1. **Install PostgreSQL** and create a database
2. **Update DATABASE_URL** in your `.env` file
3. **Run Prisma migrations**:
   ```bash
   npx prisma migrate dev
   ```

## Email Setup (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Use the app password** in your `EMAIL_PASSWORD` environment variable

## Security Considerations

- **Change JWT_SECRET** to a strong, unique secret in production
- **Use environment-specific configurations** for different deployment environments
- **Never commit `.env` files** to version control
- **Use strong database passwords** and restrict database access
- **Enable HTTPS** in production environments

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use your deployment platform's environment variable management
2. **Database**: Use a managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
3. **Email**: Use a transactional email service (SendGrid, AWS SES, etc.)
4. **SSL/TLS**: Enable HTTPS with proper certificates
5. **Monitoring**: Set up application monitoring and logging
6. **Backup**: Configure database backups and disaster recovery

## Configuration Validation

The application validates configuration on startup. Check the console output for any configuration errors when starting the application. 
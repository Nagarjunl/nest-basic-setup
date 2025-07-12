// Active user data interface for JWT payload
export interface ActiveUserData {
  sub: number;
  email: string;
  firstName?: string;
  employeeCode?: string;
  role?: string;
  refreshTokenId?: string;
}

// Base entity interface
export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Pagination interface
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Pagination response interface
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// JWT payload interface
export interface JwtPayload {
  sub: number;
  email: string;
  role?: string;
  refreshTokenId?: string;
  [key: string]: any;
}

// Request with user interface
export interface RequestWithUser extends Request {
  user?: ActiveUserData;
} 
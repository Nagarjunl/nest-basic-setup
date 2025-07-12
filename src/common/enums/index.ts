// Authentication types
export enum AuthType {
  Bearer = 'Bearer',
  None = 'None',
}

// User roles
export enum Role {
  Admin = 'Admin',
  User = 'User',
  Employee = 'Employee',
}

// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// Database operations
export enum DatabaseOperation {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  FIND = 'find',
  FIND_MANY = 'findMany',
}

// Sort order
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
} 
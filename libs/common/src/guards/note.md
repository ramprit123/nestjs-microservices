# Common Auth Guards

This document explains how to use the common auth guards and decorators in your NestJS microservices.

## Overview

The common library provides reusable authentication and authorization components:

- `AuthGuard`: JWT-based authentication guard
- `RolesGuard`: Role-based authorization guard
- `@Public()`: Decorator to mark routes as public (no authentication required)
- `@Roles()`: Decorator to specify required roles for a route
- `@CurrentUser()`: Parameter decorator to inject the current user

## Setup

1. Import the `AuthModule` in your app module:

```typescript
import { Module } from '@nestjs/common';
import { AuthModule } from '@app/common';

@Module({
  imports: [AuthModule],
  // ... other module configuration
})
export class AppModule {}
```

2. Use the guards globally or per controller/route:

```typescript
// Global guard setup in main.ts
import { AuthGuard, RolesGuard } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global guards
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)));
  app.useGlobalGuards(new RolesGuard(app.get(Reflector)));

  await app.listen(3000);
}
```

## Usage Examples

### Basic Authentication

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, CurrentUser, AuthUser } from '@app/common';

@Controller('protected')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get('profile')
  getProfile(@CurrentUser() user: AuthUser) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
```

### Public Routes

```typescript
import { Controller, Get } from '@nestjs/common';
import { Public } from '@app/common';

@Controller('public')
export class PublicController {
  @Get('health')
  @Public()
  getHealth() {
    return { status: 'OK' };
  }
}
```

### Role-Based Authorization

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  RolesGuard,
  Roles,
  CurrentUser,
  AuthUser,
} from '@app/common';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  @Get('users')
  @Roles('admin', 'moderator')
  getUsers(@CurrentUser() user: AuthUser) {
    return `Admin ${user.email} accessing users`;
  }

  @Get('settings')
  @Roles('admin')
  getSettings(@CurrentUser() user: AuthUser) {
    return `Super admin ${user.email} accessing settings`;
  }
}
```

### Mixed Authentication

```typescript
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  RolesGuard,
  Public,
  Roles,
  CurrentUser,
  AuthUser,
} from '@app/common';

@Controller('posts')
@UseGuards(AuthGuard, RolesGuard)
export class PostsController {
  @Get()
  @Public()
  getAllPosts() {
    return 'Public posts list';
  }

  @Get('my-posts')
  getMyPosts(@CurrentUser() user: AuthUser) {
    return `Posts for user ${user.email}`;
  }

  @Post()
  @Roles('admin', 'editor')
  createPost(@CurrentUser() user: AuthUser) {
    return `Post created by ${user.email}`;
  }
}
```

## Environment Variables

Make sure to set the following environment variables:

```env
JWT_SECRET=your-secret-key-here
```

## AuthUser Interface

The `AuthUser` interface provides the following properties:

```typescript
interface AuthUser {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
}
```

## Error Handling

The guards will throw the following exceptions:

- `UnauthorizedException`: When no token is provided or token is invalid
- `ForbiddenException`: When user doesn't have required roles or is inactive

## Best Practices

1. Always use both `AuthGuard` and `RolesGuard` together when role-based authorization is needed
2. Use `@Public()` decorator sparingly and only for truly public endpoints
3. Consider using global guards for consistent authentication across your application
4. Validate user permissions at the service level as well for additional security

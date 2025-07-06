import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from './interfaces/user.interface';
import { User } from '../auth/decorators/user.decorator';
import { BaseService } from './base.service';

@UseGuards(JwtAuthGuard)
export class BaseController {
  protected service: BaseService;

  // Initialize service with user context
  protected initService(@User() user: CurrentUser) {
    this.service.setUser(user);
  }

  // Standard success response
  protected success(data: any, message = 'Success') {
    return {
      success: true,
      message,
      data,
    };
  }

  // Standard error response
  protected error(message: string) {
    return {
      success: false,
      message,
    };
  }
}

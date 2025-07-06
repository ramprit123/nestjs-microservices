import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;
}

// src/auth/dto/update-password.dto.ts
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  password: string;
}

import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

    // Register user with Supabase Auth
    const { data, error } = await this.supabaseService.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new ConflictException('User already exists');
      }
      throw new BadRequestException(error.message);
    }

    // Create profile in public.profiles table
    if (data.user) {
      await this.createUserProfile(data.user.id, {
        email,
        firstName,
        lastName,
      });
    }

    return {
      message:
        'Registration successful. Please check your email for verification.',
      user: data.user,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const { data, error } =
      await this.supabaseService.client.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      sub: data.user.id,
      email: data.user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: data.user,
      session: data.session,
    };
  }

  async logout(userId: string) {
    const { error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.signOut(userId);

    if (error) {
      throw new BadRequestException('Logout failed');
    }

    return { message: 'Logged out successfully' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;

    const { error } =
      await this.supabaseService.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${this.configService.get('FRONTEND_URL')}/reset-password`,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'Password reset email sent' };
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const { password } = updatePasswordDto;

    const { error } = await this.supabaseService
      .getAdminClient()
      .auth.admin.updateUserById(userId, {
        password,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'Password updated successfully' };
  }

  async getProfile(userId: string) {
    const { data, error } = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new BadRequestException('Profile not found');
    }

    return data;
  }

  private async createUserProfile(userId: string, profileData: any) {
    const { error } = await this.supabaseService
      .getAdminClient()
      .from('profiles')
      .insert({
        id: userId,
        email: profileData.email,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error creating user profile:', error);
    }
  }
}

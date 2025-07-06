import { ConfigModule } from '@app/common';
import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [ConfigModule, AuthModule, SupabaseModule, PostsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}

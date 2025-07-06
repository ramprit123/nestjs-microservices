// Simple test to verify environment variables are loaded
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@app/common';

describe('Environment Configuration', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should load environment variables', () => {
    // Test that critical env vars are loaded
    expect(configService.get('SUPABASE_URL')).toBeDefined();
    expect(configService.get('JWT_SECRET')).toBeDefined();
    expect(configService.get('NODE_ENV')).toBeDefined();

    console.log('Environment variables loaded successfully:');
    console.log('SUPABASE_URL:', configService.get('SUPABASE_URL'));
    console.log('NODE_ENV:', configService.get('NODE_ENV'));
    console.log('PORT:', configService.get('PORT'));
  });
});

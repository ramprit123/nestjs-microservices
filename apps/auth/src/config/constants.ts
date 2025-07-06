import { ConfigService } from '@nestjs/config';

// Create a configuration factory that can be injected
export const createAppConfig = (configService: ConfigService) => ({
  supabase: {
    url: configService.get<string>('SUPABASE_URL'),
    anonKey: configService.get<string>('SUPABASE_ANON_KEY'),
    serviceRoleKey: configService.get<string>('SUPABASE_SERVICE_ROLE_KEY'),
  },
  jwt: {
    secret: configService.get<string>('JWT_SECRET'),
    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '7d'),
  },
  app: {
    nodeEnv: configService.get<string>('NODE_ENV', 'development'),
    port: configService.get<number>('PORT', 4001),
  },
});

// For backwards compatibility, keep these constants
// but they should be replaced with ConfigService injection
export const getEnvValue = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || defaultValue!;
};

export const SUPABASE_URL = getEnvValue('SUPABASE_URL');
export const SUPABASE_ANON_KEY = getEnvValue('SUPABASE_ANON_KEY');
export const SUPABASE_SERVICE_ROLE_KEY = getEnvValue(
  'SUPABASE_SERVICE_ROLE_KEY',
);
export const JWT_SECRET = getEnvValue('JWT_SECRET');
export const JWT_EXPIRES_IN = getEnvValue('JWT_EXPIRES_IN', '7d');
export const NODE_ENV = getEnvValue('NODE_ENV', 'development');
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

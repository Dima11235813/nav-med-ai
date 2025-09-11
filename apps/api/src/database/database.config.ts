import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.databaseUrl;

    // Parse database URL to extract connection details
    const url = new URL(databaseUrl);

    return {
      type: 'postgres',
      host: url.hostname,
      port: parseInt(url.port, 10) || 5432,
      username: url.username,
      password: url.password,
      database: url.pathname.substring(1), // Remove leading slash
      ssl: this.configService.sslEnabled,
      poolSize: this.configService.databasePoolSize,
      synchronize: this.configService.isDevelopment, // Only in development
      logging: this.configService.isDevelopment,
      entities: [__dirname + '/entities/**/*{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      migrationsRun: false,
      dropSchema: false,
      // PostGIS specific configuration
      extra: {
        // Enable PostGIS extension
        extensions: ['postgis'],
      },
    };
  }
}

// Helper method to get database config values
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get sslEnabled(): boolean {
    return process.env.DB_SSL === 'true';
  }

  get databasePoolSize(): number {
    return parseInt(process.env.DB_POOL_SIZE || '10', 10);
  }

  get databaseUrl(): string {
    return this.configService.databaseUrl;
  }

  get isDevelopment(): boolean {
    return this.configService.isDevelopment;
  }
}

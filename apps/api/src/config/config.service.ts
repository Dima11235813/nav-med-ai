import { Injectable } from '@nestjs/common';
import { config } from '@nav-med-ai/config';

@Injectable()
export class ConfigService {
  private readonly appConfig = config;

  get port(): number {
    return this.appConfig.port;
  }

  get databaseUrl(): string {
    return this.appConfig.database.url;
  }

  get jwtSecret(): string {
    return this.appConfig.auth.jwtSecret;
  }

  get corsOrigin(): string[] {
    return this.appConfig.security.cors.origin;
  }

  get isDevelopment(): boolean {
    return this.appConfig.isDevelopment;
  }

  get isProduction(): boolean {
    return this.appConfig.isProduction;
  }

  get apiBaseUrl(): string {
    return this.appConfig.api.baseUrl;
  }

  // Public configuration accessors
  get aiSearchEnabled(): boolean {
    return this.appConfig.features.aiSearch;
  }

  get telemedicineEnabled(): boolean {
    return this.appConfig.features.telemedicine;
  }

  get multiLanguageEnabled(): boolean {
    return this.appConfig.features.multiLanguage;
  }

  get corsOrigins(): string[] {
    return this.appConfig.security.cors.origin;
  }
}

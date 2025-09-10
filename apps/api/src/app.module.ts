import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProvidersModule } from './modules/providers/providers.module';
import { SearchModule } from './modules/search/search.module';
import { ConfigModule } from './config/config.module';
import { PublicConfigModule } from './modules/config/config.module';
import { HealthModule } from './modules/health/health.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // requests per ttl
      },
    ]),
    // Configuration
    ConfigModule,
    PublicConfigModule,
    // Common utilities
    CommonModule,
    // Health monitoring
    HealthModule,
    // Feature modules
    ProvidersModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

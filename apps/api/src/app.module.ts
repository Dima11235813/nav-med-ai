import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ProvidersModule } from './modules/providers/providers.module';
import { SearchModule } from './modules/search/search.module';
import { ConfigModule } from './config/config.module';

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
    // Feature modules
    ProvidersModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

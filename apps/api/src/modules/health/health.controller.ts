import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthIndicatorResult,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '../../config/config.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private configService: ConfigService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Health check',
    description: 'Check the health status of the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        info: {
          type: 'object',
          properties: {
            environment: { type: 'string', example: 'development' },
            timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
          },
        },
        details: { type: 'object' },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Application is unhealthy',
  })
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.environmentCheck(),
      () => this.db.pingCheck('database'),
    ]);
  }

  private environmentCheck(): Promise<HealthIndicatorResult> {
    return Promise.resolve({
      environment: {
        status: 'up',
        details: {
          environment: this.configService.isDevelopment ? 'development' : 'production',
          timestamp: new Date().toISOString(),
          port: this.configService.port,
        },
      },
    });
  }
}

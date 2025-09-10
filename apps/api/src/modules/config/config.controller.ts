import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '../../config/config.service';

@ApiTags('config')
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @ApiOperation({
    summary: 'Get public application configuration',
    description: 'Retrieve public configuration settings for the frontend application',
  })
  @ApiResponse({
    status: 200,
    description: 'Public configuration retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        apiVersion: { type: 'string', example: 'v1' },
        features: {
          type: 'object',
          properties: {
            aiSearch: { type: 'boolean' },
            telemedicine: { type: 'boolean' },
            multiLanguage: { type: 'boolean' },
          },
        },
        providerSpecialties: {
          type: 'array',
          items: { type: 'string' },
          example: ['Cardiology', 'Dermatology', 'Primary Care'],
        },
        usStates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'CO' },
              name: { type: 'string', example: 'Colorado' },
            },
          },
        },
      },
    },
  })
  getPublicConfig() {
    return {
      apiVersion: 'v1',
      features: {
        aiSearch: this.configService.aiSearchEnabled,
        telemedicine: this.configService.telemedicineEnabled,
        multiLanguage: this.configService.multiLanguageEnabled,
      },
      // Add any other public configuration here
      // Note: Never expose sensitive data like API keys, secrets, etc.
    };
  }

  @Get('constants')
  @ApiOperation({
    summary: 'Get application constants',
    description: 'Retrieve public constants needed by the frontend',
  })
  @ApiResponse({
    status: 200,
    description: 'Constants retrieved successfully',
  })
  getConstants() {
    // Import constants dynamically to avoid bundling issues
    const { PROVIDER_SPECIALTIES, US_STATES } = require('@nav-med-ai/config');

    return {
      providerSpecialties: PROVIDER_SPECIALTIES,
      usStates: US_STATES,
    };
  }
}

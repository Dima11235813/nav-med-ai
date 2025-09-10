import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { ConfigService } from '../../config/config.service';
import { PublicConfigSchema, AppConstantsSchema } from '../../config/swagger-schemas';

@ApiTags('config')
@ApiExtraModels(PublicConfigSchema, AppConstantsSchema)
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
    type: PublicConfigSchema,
  })
  getPublicConfig() {
    // Import constants dynamically to avoid bundling issues
    const { PROVIDER_SPECIALTIES, US_STATES } = require('@nav-med-ai/config');

    return {
      apiVersion: 'v1',
      features: {
        aiSearch: this.configService.aiSearchEnabled,
        telemedicine: this.configService.telemedicineEnabled,
        multiLanguage: this.configService.multiLanguageEnabled,
      },
      providerSpecialties: PROVIDER_SPECIALTIES,
      usStates: US_STATES,
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
    type: AppConstantsSchema,
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

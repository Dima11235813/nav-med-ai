import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { Provider } from '@nav-med-ai/types';
import { ProviderSchema, ApiResponseSchema } from '../../config/swagger-schemas';

@ApiTags('providers')
@ApiExtraModels(ProviderSchema, ApiResponseSchema)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get provider by ID',
    description: 'Retrieve detailed information about a specific healthcare provider',
  })
  @ApiParam({
    name: 'id',
    description: 'Provider ID',
    example: '1',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Provider found successfully',
    schema: {
      type: 'object',
      properties: {
        data: { $ref: getSchemaPath(ProviderSchema) },
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Provider not found',
  })
  async getProvider(@Param('id') id: string) {
    try {
      const provider = await this.providersService.getProviderById(id);

      if (!provider) {
        throw new HttpException(
          {
            success: false,
            message: 'Provider not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: provider,
        success: true,
        message: 'Provider found successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Failed to retrieve provider',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

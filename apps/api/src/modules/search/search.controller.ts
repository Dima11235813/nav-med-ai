import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchFilters, Provider } from '@nav-med-ai/types';
import { SearchProvidersDto } from './dto/search-providers.dto';
import { ProviderSchema, ApiResponseSchema } from '../../config/swagger-schemas';

@ApiTags('search')
@ApiExtraModels(ProviderSchema, ApiResponseSchema)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('providers')
  @ApiOperation({
    summary: 'Search for healthcare providers',
    description: 'Search healthcare providers by specialty, location, and other filters',
  })
  @ApiQuery({
    name: 'specialty',
    required: false,
    description: 'Medical specialty to search for',
  })
  @ApiQuery({
    name: 'city',
    required: false,
    description: 'City to search in',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    description: 'State to search in',
  })
  @ApiQuery({
    name: 'zipCode',
    required: false,
    description: 'ZIP code to search in',
  })
  @ApiQuery({
    name: 'radius',
    required: false,
    description: 'Search radius in miles',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Providers found successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(ProviderSchema) },
        },
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid search parameters',
  })
  async searchProviders(@Query() query: SearchProvidersDto) {
    try {
      const filters: SearchFilters = {
        specialty: query.specialty ? [query.specialty] : undefined,
        location: query.city || query.state || query.zipCode ? {
          city: query.city,
          state: query.state,
          zipCode: query.zipCode,
        } : undefined,
        radius: query.radius,
      };

      const providers = await this.searchService.searchProviders(filters);

      return {
        data: providers,
        success: true,
        message: `Found ${providers.length} providers`,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error instanceof Error ? error.message : 'Search failed',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

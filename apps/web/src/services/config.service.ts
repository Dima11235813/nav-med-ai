export interface PublicConfig {
  apiVersion: string;
  features: {
    aiSearch: boolean;
    telemedicine: boolean;
    multiLanguage: boolean;
  };
}

export interface AppConstants {
  providerSpecialties: string[];
  usStates: Array<{
    code: string;
    name: string;
  }>;
}

class ConfigService {
  private config: PublicConfig | null = null;
  private constants: AppConstants | null = null;
  private apiBaseUrl: string;

  constructor() {
    // Default to localhost API, can be overridden by environment
    this.apiBaseUrl = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3001';
  }

  async getConfig(): Promise<PublicConfig> {
    if (!this.config) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/config`);
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        this.config = await response.json();
      } catch (error) {
        console.warn('Failed to fetch config from API, using defaults:', error);
        // Fallback to defaults if API is not available
        this.config = {
          apiVersion: 'v1',
          features: {
            aiSearch: false,
            telemedicine: false,
            multiLanguage: false,
          },
        };
      }
    }
    return this.config;
  }

  async getConstants(): Promise<AppConstants> {
    if (!this.constants) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/api/config/constants`);
        if (!response.ok) {
          throw new Error('Failed to fetch constants');
        }
        this.constants = await response.json();
      } catch (error) {
        console.warn('Failed to fetch constants from API, using defaults:', error);
        // Fallback constants if API is not available
        this.constants = {
          providerSpecialties: [
            'Primary Care',
            'Cardiology',
            'Dermatology',
            'Emergency Medicine',
            'Endocrinology',
            'Gastroenterology',
            'Hematology',
            'Infectious Disease',
            'Nephrology',
            'Neurology',
            'Obstetrics and Gynecology',
            'Oncology',
            'Ophthalmology',
            'Orthopedics',
            'Otolaryngology',
            'Pediatrics',
            'Psychiatry',
            'Pulmonology',
            'Radiology',
            'Rheumatology',
            'Surgery',
            'Urology',
          ],
          usStates: [
            { code: 'AL', name: 'Alabama' },
            { code: 'AK', name: 'Alaska' },
            { code: 'AZ', name: 'Arizona' },
            { code: 'AR', name: 'Arkansas' },
            { code: 'CA', name: 'California' },
            { code: 'CO', name: 'Colorado' },
            { code: 'CT', name: 'Connecticut' },
            { code: 'DE', name: 'Delaware' },
            { code: 'FL', name: 'Florida' },
            { code: 'GA', name: 'Georgia' },
            { code: 'HI', name: 'Hawaii' },
            { code: 'ID', name: 'Idaho' },
            { code: 'IL', name: 'Illinois' },
            { code: 'IN', name: 'Indiana' },
            { code: 'IA', name: 'Iowa' },
            { code: 'KS', name: 'Kansas' },
            { code: 'KY', name: 'Kentucky' },
            { code: 'LA', name: 'Louisiana' },
            { code: 'ME', name: 'Maine' },
            { code: 'MD', name: 'Maryland' },
            { code: 'MA', name: 'Massachusetts' },
            { code: 'MI', name: 'Michigan' },
            { code: 'MN', name: 'Minnesota' },
            { code: 'MS', name: 'Mississippi' },
            { code: 'MO', name: 'Missouri' },
            { code: 'MT', name: 'Montana' },
            { code: 'NE', name: 'Nebraska' },
            { code: 'NV', name: 'Nevada' },
            { code: 'NH', name: 'New Hampshire' },
            { code: 'NJ', name: 'New Jersey' },
            { code: 'NM', name: 'New Mexico' },
            { code: 'NY', name: 'New York' },
            { code: 'NC', name: 'North Carolina' },
            { code: 'ND', name: 'North Dakota' },
            { code: 'OH', name: 'Ohio' },
            { code: 'OK', name: 'Oklahoma' },
            { code: 'OR', name: 'Oregon' },
            { code: 'PA', name: 'Pennsylvania' },
            { code: 'RI', name: 'Rhode Island' },
            { code: 'SC', name: 'South Carolina' },
            { code: 'SD', name: 'South Dakota' },
            { code: 'TN', name: 'Tennessee' },
            { code: 'TX', name: 'Texas' },
            { code: 'UT', name: 'Utah' },
            { code: 'VT', name: 'Vermont' },
            { code: 'VA', name: 'Virginia' },
            { code: 'WA', name: 'Washington' },
            { code: 'WV', name: 'West Virginia' },
            { code: 'WI', name: 'Wisconsin' },
            { code: 'WY', name: 'Wyoming' },
          ],
        };
      }
    }
    return this.constants;
  }

  // Convenience methods
  async getProviderSpecialties(): Promise<string[]> {
    const constants = await this.getConstants();
    return constants.providerSpecialties;
  }

  async getUSStates(): Promise<Array<{ code: string; name: string }>> {
    const constants = await this.getConstants();
    return constants.usStates;
  }

  async isFeatureEnabled(feature: keyof PublicConfig['features']): Promise<boolean> {
    const config = await this.getConfig();
    return config.features[feature];
  }
}

// Export singleton instance
export const configService = new ConfigService();
export default configService;

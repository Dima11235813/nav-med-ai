import { PipelineConfig as IPipelineConfig } from '../types';

/**
 * Pipeline configuration class
 */
export class PipelineConfig implements IPipelineConfig {
  name: string;
  description?: string;
  steps: any[];
  schedule?: {
    cron: string;
    timezone?: string;
  };
  notifications?: {
    onSuccess?: boolean;
    onFailure?: boolean;
    emailRecipients?: string[];
  };

  constructor(config: IPipelineConfig) {
    this.name = config.name;
    this.description = config.description;
    this.steps = config.steps;
    this.schedule = config.schedule;
    this.notifications = config.notifications;
  }
}

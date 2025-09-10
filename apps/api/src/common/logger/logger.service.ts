import { Injectable, LoggerService as NestLoggerService, LogLevel } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly isDevelopment: boolean;

  constructor(private configService: ConfigService) {
    this.isDevelopment = configService.isDevelopment;
  }

  log(message: any, context?: string) {
    this.writeLog('log', message, context);
  }

  error(message: any, stack?: string, context?: string) {
    this.writeLog('error', message, context, stack);
  }

  warn(message: any, context?: string) {
    this.writeLog('warn', message, context);
  }

  debug?(message: any, context?: string) {
    if (this.isDevelopment) {
      this.writeLog('debug', message, context);
    }
  }

  verbose?(message: any, context?: string) {
    if (this.isDevelopment) {
      this.writeLog('verbose', message, context);
    }
  }

  private writeLog(
    level: LogLevel,
    message: any,
    context?: string,
    stack?: string,
  ) {
    const timestamp = new Date().toISOString();
    const prefix = context ? `[${context}]` : '';
    const formattedMessage = typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : message;

    const logEntry = `${timestamp} ${level.toUpperCase()} ${prefix} ${formattedMessage}`;

    if (stack) {
      console.error(logEntry);
      console.error(stack);
    } else {
      console.log(logEntry);
    }
  }

  setLogLevels?(levels: LogLevel[]) {
    // Implementation for setting log levels if needed
  }
}

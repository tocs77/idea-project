import winston from 'winston';
import { env } from './env';
import { serializeError } from 'serialize-error';
import { deepMap } from '../utils/deepMap';

type Meta = Record<string, any> | undefined;

const prettifyMeta = (meta: Meta): string => {
  return deepMap(meta, ({ key, value }) => {
    if (['email', 'password', 'newPassword', 'oldPassword', 'passwordAgain', 'token', 'text', 'description'].includes(key)) {
      return '***';
    }
    return value;
  });
};

const enableDebug = (namespace: string): boolean => {
  // This implements a simple pattern matching similar to the debug package
  const DEBUG = process.env.DEBUG || '';

  const patterns = DEBUG.split(',');

  let enabled = false;
  for (const pattern of patterns) {
    if (!pattern) continue;

    // Check if it's a negation pattern
    const isNegation = pattern.startsWith('-');
    const actualPattern = isNegation ? pattern.slice(1) : pattern;

    // Check if the pattern matches the namespace
    // Simple wildcard matching: 'foo:*' matches 'foo:bar'
    if (actualPattern.endsWith('*')) {
      const prefix = actualPattern.slice(0, -1);
      if (namespace.startsWith(prefix)) {
        enabled = !isNegation;
      }
    } else if (actualPattern === namespace) {
      enabled = !isNegation;
    }
  }

  return enabled;
};

export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: {
    service: 'backend',
    hostEnv: env.WEBAPP_URL,
  },
  transports: [new winston.transports.Console({ format: winston.format.json() })],
});

// Create a simple direct logging function that doesn't depend on the debug package
const directLog = (namespace: string, message: string) => {
  if (enableDebug(namespace)) {
    console.log(`[${namespace}] ${message}`);
    return true;
  }
  return false;
};

export const logger = {
  info: (logType: string, message: string, meta?: Meta) => {
    const fullNamespace = `ideanick:${logType}`;

    const prettifiedMeta = prettifyMeta(meta) || {};

    // Try our direct logging approach first
    const logged = directLog(fullNamespace, `${message} ${prettifiedMeta ? JSON.stringify(prettifiedMeta) : ''}`);

    // If direct logging worked, also log to winston
    if (logged) {
      winstonLogger.info(message, { logType, ...prettifiedMeta });
    }
  },
  error: (logType: string, error: any, meta?: Meta) => {
    const fullNamespace = `ideanick:${logType}`;

    const serializedError = serializeError(error);
    const errorMessage = `ERROR: ${serializedError.message || 'Unknown error'}`;

    // Try our direct logging approach first
    const logged = directLog(fullNamespace, errorMessage);
    const prettifiedMeta = prettifyMeta(meta) || {};

    // If direct logging worked, also log to winston
    if (logged) {
      winstonLogger.error(serializedError.message || 'Unknown error', {
        logType,
        error,
        errorStack: serializedError.stack,
        ...prettifiedMeta,
      });
    }
  },
};

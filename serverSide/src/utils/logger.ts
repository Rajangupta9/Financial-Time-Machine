// src/utils/logger.ts
import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define log level based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

// Define log colors
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

// Assign colors to levels
winston.addColors(colors);

// Define the format for console output
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

// Define the format for file output
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.json(),
);

// Define file locations
const logDir = 'logs';
const errorLogPath = path.join(logDir, 'error.log');
const combinedLogPath = path.join(logDir, 'combined.log');

// Create transports
const transports = [
    // Console transport for development visibility
    new winston.transports.Console({
        format: consoleFormat,
    }),
    // File transport for errors only
    new winston.transports.File({
        filename: errorLogPath,
        level: 'error',
        format: fileFormat,
    }),
    // File transport for all logs
    new winston.transports.File({
        filename: combinedLogPath,
        format: fileFormat,
    }),
];

// Create logger instance
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
    // Don't exit on uncaught exceptions
    exitOnError: false,
});

// Create a stream object for Morgan integration
export const stream = {
    write: (message: string) => {
        logger.http(message.trim());
    },
};

// Create method to log errors with stack traces
export const logError = (err: Error): void => {
    logger.error(`${err.message} - Stack: ${err.stack}`);
};

// Log special events like financial calculations or simulations with context
export const logFinancialEvent = (operation: string, details: object): void => {
    logger.info(`FINANCIAL_EVENT [${operation}] - ${JSON.stringify(details)}`);
};

// Log security events
export const logSecurityEvent = (action: string, userId: string, details?: object): void => {
    logger.info(`SECURITY_EVENT [${action}] User:${userId} ${details ? JSON.stringify(details) : ''}`);
};

// Log performance metrics
export const logPerformance = (operation: string, durationMs: number): void => {
    logger.debug(`PERFORMANCE [${operation}] - ${durationMs}ms`);
};

// Extend with a method to create child loggers for different modules
export const createModuleLogger = (moduleName: string) => {
    return {
        error: (message: string, meta?: object) => logger.error(`[${moduleName}] ${message}`, meta),
        warn: (message: string, meta?: object) => logger.warn(`[${moduleName}] ${message}`, meta),
        info: (message: string, meta?: object) => logger.info(`[${moduleName}] ${message}`, meta),
        http: (message: string, meta?: object) => logger.http(`[${moduleName}] ${message}`, meta),
        debug: (message: string, meta?: object) => logger.debug(`[${moduleName}] ${message}`, meta),
        performance: (operation: string, durationMs: number) =>
            logPerformance(`${moduleName} - ${operation}`, durationMs),
    };
};

export default logger;
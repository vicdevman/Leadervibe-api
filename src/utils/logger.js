const winston = require('winston');

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

const transports = [];

// On Vercel/serverless, the filesystem is read-only, so we avoid File transports
if (process.env.VERCEL) {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
} else {
    // Local/normal environments: keep file logging and add console in non-production
    transports.push(
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    );

    if (process.env.NODE_ENV !== 'production') {
        transports.push(
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                ),
            })
        );
    }
}

// Create logger instance
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'leadervibe-api' },
    transports,
});

module.exports = logger;
import { createLogger, format, transports } from 'winston';
import path from 'path';

const logPath = path.join(__dirname, '../../logs/domain.log');

export const domainLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: logPath, level: 'info' }), 
    new transports.Console(), 
  ],
});
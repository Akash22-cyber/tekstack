const winston = require('winston');

// Configure Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console Transport: simple format with timestamp metadata
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    }),
    // File Transport: JSON format written to app.log
    new winston.transports.File({
      filename: 'app.log'
    })
  ]
});

module.exports = logger;

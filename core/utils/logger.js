console.log("Opening logger.js.");
const winston = require('winston');


//LOGGER
console.log("Build logger.");
const logger = winston.createLogger({
    levels: {
      backend: 0,
      info: 1,
      warning: 2,
      error: 3
    },
    format: winston.format.combine(
      winston.format.colorize(
        {
          colors: {
            backend: 'magenta',
            info: 'green',
            warning: 'yellow',
            error: 'red'
          }
        }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});
logger.add(new winston.transports.Console({
    format: winston.format.simple()
}));
console.log("Export logger.");
module.exports = logger;
console.log("Logger built.");

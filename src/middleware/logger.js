import expressWinston from 'express-winston'
import winston from 'winston'

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

export default (name) => expressWinston.logger({
  transports: [

    new winston.transports.File({
      name: name,
      filename: name,
      level: 'debug',
      maxsize: 5242880,
      maxFiles: 10,
    })
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  )
})

var path = require('path');
var fs = require('fs');
var winston = require('winston');
var DailyRotateFile = require('winston-daily-rotate-file')

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var wins = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(require('winston-daily-rotate-file'))({
            filename: path.join(logDirectory, 'all-logs.log'),
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            // level: process.env.ENV === 'development' ? 'debug' : 'info'
        }),
        new(require('winston-daily-rotate-file'))({
            filename: path.join(logDirectory, 'exceptions.log'),
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: 'error',
            name: 'error'
            // level: process.env.ENV === 'development' ? 'debug' : 'info'
        })
    ]
});
wins.stream = {
    write: function(message, encoding) {
        wins.info(message);
    }
};
module.exports = wins;

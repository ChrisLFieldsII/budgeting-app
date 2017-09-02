const log4js = require('log4js');
log4js.configure(require('../config/server/log4js'));
module.exports = log4js.getLogger('serverLogger');
//levels: ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
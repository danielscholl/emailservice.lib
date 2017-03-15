"use strict";
var EmailService = require('./lib/emailservice');

var Component = function(args) {
  var self = this;
  var service = new EmailService(args);

  self.send = function(email, next) {
    service.send(email, function(err, result) {
      next(err, result);
    });
  }

  return self;
}
module.exports = Component;

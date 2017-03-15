'use strict';

var nodemailer = require('nodemailer');
var Emitter = require('events').EventEmitter;
var util = require('util');
var Options = require('./options');


var EmailResult = function(){
  var result = {
    success: false,
    message: null
  };

  return result;
};


var EmailService = function(args) {
  Emitter.call(this);
  var self = this;
  var continueWith = null;
  var transport;

  if(args.service === 'SendGrid') {
    transport = require('nodemailer-sendgrid-transport');
  } else {
    transport = require('nodemailer-smtp-transport');
  }
  var options = new Options(args);


  var validateInputs = function(email){
    if(!email.from || !email.to) {
      self.emit('email-fail', 'To and From are required');
    } else if(!email.subject) {
      self.emit('email-fail', 'Subject is required');
    } else {
      self.emit('email-send', email);
    }
  };


  var emailOk = function(result) {
    var emailResult = new EmailResult();
    emailResult.success = true;
    emailResult.message = result;

    if(continueWith){
      continueWith(null, emailResult);
    }
  };


  var emailFail = function(error) {
    var emailResult = new EmailResult();
    emailResult.success = false;
    emailResult.message = error;

    if(continueWith) {
      continueWith(null, emailResult);
    }
  };


  var sendEmail = function(email) {
    var transporter = nodemailer.createTransport(transport(options));

    transporter.sendMail(email, function(error, result){
      if(error) {
        self.emit('email-fail', error);
      } else {
        self.emit('email-ok', result);
      }
    });
    transporter.close();
  };


  self.send = function(email, next){
    continueWith = next;
    self.emit('email-received', email);
  };

  //event wiring
  self.on('email-received', validateInputs);
  self.on('email-send', sendEmail);
  self.on('email-ok', emailOk);
  self.on('email-fail', emailFail);
};

util.inherits(EmailService, Emitter);
module.exports = EmailService;

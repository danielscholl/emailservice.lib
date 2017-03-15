/* jshint -W030, -W098 */
'use strict';

var should = require('chai').should();
var assert = require('assert');
var _ = require('lodash');
var EmailService = require('../lib/EmailService');


describe('Email Service', function() {
  var args = {};
  var email = {};

  before(function(done) {
    assert.ok(process.env.SMTP_PASSWORD, 'SMTP_PASSWORD not set');
    assert.ok(process.env.SMTP_USERNAME, 'SMTP_USERNAME not set');
    assert.ok(process.env.EMAIL_TO, 'EMAIL_TO not set');
    args.username = process.env.SMTP_USERNAME;
    args.password = process.env.SMTP_PASSWORD;
    if(process.env.SMTP_SERVICE) {
      args.service = process.env.SMTP_SERVICE;
    }

    email =  {
      from: 'EmailService.lib <Unit.Test@vzdigitalmedia.com>',
      to: process.env.EMAIL_TO,
      subject: 'Unit Test Email',
      text: 'Your Email has been sent',
      html: '<b>Your Email has been sent</b>'
    };
    done();
  });

  describe('A Successful Email', function() {
    var response = null;

    it('should return a success', function(done) {
      var service = new EmailService(args);
      service.send(email, function(err, result){
        response = result;
        if(!result.success) {
          console.log(result.message);
        }
        result.success.should.be.true;
        done();
      });
    });

    it('should have message details', function(done) {
      response.message.should.not.be.null;
      done();
    });
  });


  describe('A Badly Formed Email', function() {
    var badEmail = null;

    beforeEach(function() {
      badEmail = _.clone(email);
    });

    it('should require a to address', function(done) {
      badEmail.to = null;

      var service = new EmailService(args);
      service.send(badEmail, function(err, result) {
        result.success.should.be.false;
        result.message.should.equal('To and From are required');
        done();
      });
    });

    it('should require a from address', function(done) {
      badEmail.from = null;

      var service = new EmailService(args);
      service.send(badEmail, function(err, result) {
        result.success.should.be.false;
        result.message.should.equal('To and From are required');
        done();
      });
    });

    it('should require a subject', function(done) {
      badEmail.subject = null;

      var service = new EmailService(args);
      service.send(badEmail, function(err, result) {
        result.success.should.be.false;
        result.message.should.equal('Subject is required');
        done();
      });
    });
  });


  describe('Bad Credentials', function() {
    var badArgs = null;

    beforeEach(function() {
      badArgs = _.clone(args);
    });

    it('should fail with a bad username or password', function(done) {
      badArgs.username = 'BadUser';
      badArgs.password = 'BadPassword';

      var service = new EmailService(badArgs);
      service.send(email, function(err, result){
        result.success.should.be.false;
        result.message.should.not.be.null;
        done();
      });
    });
  });
});

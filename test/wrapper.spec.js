/* jshint -W030, -W098 */
'use strict';

var should = require('chai').should();
var Component = require('../index');

describe('Component Wrapper', function() {
  var args = {};
  var email = {};

  before(function(done) {
    args.username = 'UserName';
    args.password = 'Password';

    done();
  });

  var component = new Component(args);
  it('should wrap', function(done) {
    component.send({}, function(err, result){
      result.success.should.be.false;
      done();
    });
  });
});

'use strict';

var Options = function(args){

    var options = {};
    options.service = args.service || 'gmail';
    options.auth ={};
    if(options.service === 'SendGrid') {
    	options.auth.api_user = args.username || 'SENDGRID_USERNAME';
    	options.auth.api_key = args.password || 'SENDGRID_PASSWORD';

    } else {
    	options.auth.user = args.username || 'username';
    	options.auth.pass = args.password || 'pass';
    }
    
    options.secure = true;

    return options;
};

module.exports = Options;

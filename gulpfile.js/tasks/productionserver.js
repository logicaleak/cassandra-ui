var express = require('express');
var logger = require('morgan');
var gutil = require('gulp-util');
var path = require('path');
var gulp = require('gulp');


var port = process.argv.port;

//Inspired from gulp-starter project in github
var settings = {
  root: path.resolve(process.cwd(), './build'),
  port: port || 3000,
  logLevel: 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
};

var executeServer = function() {
  gutil.log('root is ' + settings.root);

	express()
	    // .use(compress())
	    .use(logger())
	    .use('/', express.static(settings.root, settings.staticOptions))
	    .listen(settings.port);	

  gutil.log('production server started on ' + gutil.colors.green('selam'));
};

gulp.task('prod-server', executeServer);




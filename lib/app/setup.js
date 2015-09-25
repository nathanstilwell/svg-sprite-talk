/*global __dirname, require, process, module */
'use strict';

// set to the root of the project
var path = require('path');
var root = __dirname + '/../..';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var hbs = require('hbs');
var fs = require('fs');
var morgan = require('morgan');
var mkdirp = require('mkdirp');

var env = process.env.NODE_ENV || 'development';
var port = 5555;

//
//   Setup Access logging
//

var productionLogFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';
var developmentLogFormat = 'tiny';
var logFormat = (env === 'production') ? productionLogFormat : developmentLogFormat;
mkdirp.sync(root + '/log'); // make log dir, if it doesn't exist
var acessLogStream = fs.createWriteStream(root + '/log/access.log', {flags: 'a+'});

module.exports = function expressAppSetup (app) {

  //
  //  Configure Express App
  //

  // Set the Application Port
  app.set('port', (process.env.PORT || port));
  // Template Engine for rendering views
  app.set('view engine', 'hbs');
  // Directory for Views
  app.set('views', root + '/public/templates');
  // Use a default layout
  app.set('view options', { layout: 'layouts/default.hbs' });
  // Set up a static assets folder
  app.use(express.static(root + '/public'));
  // For parsing post bodies. Adds a req.body property
  app.use(bodyParser.urlencoded({ extended: false }));
  // Allow for parsing cookies from the request. Adds a req.cookie property
  app.use(cookieParser());
  // Multipart Forms (So you can upload images)
  app.use(multer({ inMemory: true }));
  // Using morgan for access loggin
  app.use(morgan(logFormat, { stream: acessLogStream }));

  //
  //  Handlebars Setup
  //

  // Register Template Partials

  hbs.registerPartials(root + '/public/templates/partials');

  //  Handlebars Helpers

  var blocks = {};

  hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  });

  hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
  });

  hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
  });

  return app;
};

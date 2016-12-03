
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/routes');
var errors = require('./routes/errors');



// EXPRESS SETUP ==============================================

export var app = express();

export var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.resolve(__dirname + '/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// SOCKET.IO API ==============================================

// import { init } from "./api/socket-api";
// init(io);

// ROS API ==============================================
import { ros } from './api/node-api';

// TASK SCHEDULUER API ==============================================

import { taskInit } from "./api/task-api";
var taskscheduler = taskInit();

// ZMQ API ==============================================

import { ZMQInit } from "./api/zmq-api";
var zmqsocket = ZMQInit();



// LOGIC ==============================================

import { joystickPubInit } from "./logic/joystick-pub";
joystickPubInit(io, ros);

import { graphUpdateInit } from "./logic/graph-update";
graphUpdateInit(io, zmqsocket);


import { speechToTextLogic } from "./logic/speech-to-text";
speechToTextLogic(io, taskscheduler);

import { tasksInit } from './logic/task-logic';
tasksInit(taskscheduler);

import { armRun } from './logic/arm-logic';
//armRun();
// EXPRESS ROUTES ==============================================

app.use('/', routes);
errors.init(app);



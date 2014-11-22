var compression = require('compression');
var serveStatic = require('serve-static');
var express = require('express')
var app = express();
app.use(compression());
app.use(serveStatic('public', {'index': ['index.html']}));
var http = app.listen(process.env.PORT || 3000);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var pkg = require('./package.json');

var controllerPath = pkg.config.app.controllers;
var controllers = _.reduce(fs.readdirSync(controllerPath), function (obj, filename) {
  var name = filename.toLowerCase().split('.').shift();
  var Controller = require([controllerPath, name].join(path.sep));
  obj[name] = new Controller();
  return obj;
}, {});

console.log("api:", Object.keys(controllers));

function wrapSocket(socket) {
  return {
    io: {
      broadcast: function (message) {
        socket.broadcast.emit(message);
      },
      reply: function (resource, action, data) {
        if (_.isObject(data)) {
          data = JSON.stringify(data);
        }
        socket.emit('/' + resource, [action, data].join(' '))
      }
    }
  }
}

function routeSocketMessage(socket, method, message) {
  var end, route, controller, req = {
    method: method
  };
  if (message[0] === '/') {
    end = message.indexOf(' ');
    if (end === -1) {
      route = message.substr(1);
    } else {
      route = message.substr(1, end - 1);
      req.body = message.substr(end + 1);
    }
    route = route.toLowerCase().split('/');
    if (route.length === 2) {
      if(controllers[route[0]] && _.isFunction(controllers[route[0]][route[1]])) {
        controller = controllers[route[0]];
        controller[route[1]](req, wrapSocket(socket));
      } else {
        console.log('route does not exist:', route)
      }
    } else {
      console.log('not a route', end, message, route)
    }
  } else {
    console.log('message', message);
  }
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('get', function (message) {
    console.log('get', message);
    routeSocketMessage(socket, 'get', message);
  });
  socket.on('put', function (message) {
    console.log('put', message);
    routeSocketMessage(socket, 'put', message);
  });
  socket.on('post', function (message) {
    console.log('post', message);
    routeSocketMessage(socket, 'post', message);
  });
  socket.on('delete', function (message) {
    console.log('delete', message);
    routeSocketMessage(socket, 'delete', message);
  });
  socket.on('patch', function (message) {
    console.log('patch', message);
    routeSocketMessage(socket, 'patch', message);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


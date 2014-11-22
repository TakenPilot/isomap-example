var uuid = require('node-uuid');

/**
 * @constructor
 */
var Users = function () {
  this.signedIn = {};
};

Users.prototype = {
  "get": function (req, res) {
    console.log('get', req, res);
    if (res.io) {
      res.io.reply('users', 'get', this.signedIn);
    }
  },
  "list": function (req, res) {
    console.log('list', req, res);
    if (res.io) {
      res.io.reply('users', 'list', this.signedIn);
    }
  },
  "create": function (req, res) {
    console.log('create', req, res);
    if (res.io) {
      res.io.reply('users', 'create', this.signedIn);
    }
  },
  "destroy": function (req, res) {
    console.log('destroy', req, res);
    if (res.io) {
      res.io.reply('users', 'destroy', this.signedIn);
    }
  },
  "update": function (req, res) {
    console.log('update', req, res);
    if (res.io) {
      res.io.reply('users', 'update', this.signedIn);
    }
  },
  "sign-in": function (req, res) {
    console.log('sign-in', req, res);
    if (res.io) {
      console.log(this);
      var id = uuid.v1();
      var user = {
        id: id,
        authenticated: true
      };
      this.signedIn[id] = user;
      res.io.reply('users', 'sign-in', user);
    }
  },
  "sign-out": function (req, res) {
    console.log('sign-out');
    if (res.io) {
      if (!req.id) {
        res.io.clientError(400);
      } else {
        var user = this.signedIn[req.id];
        if (!user) {
          res.io.clientError(404);
        } else {
          user.authenticated = false;
          res.io.reply('users', 'sign-out', user);
        }
      }
    }
  }
};

module.exports = Users;
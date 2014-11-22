var uuid = require('node-uuid');

/**
 * @constructor
 */
var Entities = function () {
  this.list = {};
};

Entities.prototype = {
  "get": function (req, res) {
    console.log('get', req, res);
    if (res.io) {
      res.io.reply('entities', 'get', this.list);
    }
  },
  "list": function (req, res) {
    console.log('list', req, res);
    if (res.io) {
      res.io.reply('entities', 'list', this.list);
    }
  },
  "create": function (req, res) {
    console.log('create', req, res);
    if (res.io) {
      res.io.reply('entities', 'create', this.list);
    }
  },
  "destroy": function (req, res) {
    console.log('destroy', req, res);
    if (res.io) {
      res.io.reply('entities', 'destroy', this.list);
    }
  },
  "update": function (req, res) {
    console.log('update', req, res);
    if (res.io) {
      res.io.reply('entities', 'update', this.list);
    }
  }
};

module.exports = Entities;
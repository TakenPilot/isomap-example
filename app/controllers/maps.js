var uuid = require('node-uuid');

/**
 * @constructor
 */
var Maps = function () {
  this.list = {};
};

Maps.prototype = {
  "get": function (req, res) {
    console.log('get', req, res);
    if (res.io) {
      res.io.reply('maps', 'get', this.list);
    }
  },
  "list": function (req, res) {
    console.log('list', req, res);
    if (res.io) {
      res.io.reply('maps', 'list', this.list);
    }
  },
  "create": function (req, res) {
    console.log('create', req, res);
    if (res.io) {
      res.io.reply('maps', 'create', this.list);
    }
  },
  "destroy": function (req, res) {
    console.log('destroy', req, res);
    if (res.io) {
      res.io.reply('maps', 'destroy', this.list);
    }
  },
  "update": function (req, res) {
    console.log('update', req, res);
    if (res.io) {
      res.io.reply('maps', 'update', this.list);
    }
  }
};

module.exports = Maps;
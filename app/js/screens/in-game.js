/**
 * @class
 */
var InGameScreen = (function () {
  /**
   *
   * @param {Game} game
   * @constructs
   */
  var constructor = function (game) {
    this.game = game;
  };
  constructor.prototype = {
    "create": function () {
      var d = Promise.defer();
      var userEntity = this.game.user.entity;
      var p = JSON.stringify(userEntity.p);

      subscribe('/maps', function (e) {
        console.log(e);
      });
      socket.emit('get', '/maps ' + p);
      subscribe('/entities', function (e) {
        console.log(e);
      });
      socket.emit('get', '/entities ' + p);

      return d.promise
        .timeout(1000, "Timeout: failed to get map " + p);
    },
    "enter": function () {
      this.game.stage.backgroundColor = 'black';
    },
    "leave": function () {},
    "update": function () {},
    "render": function () {}
  };
  return constructor;
})();
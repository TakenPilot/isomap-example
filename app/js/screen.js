/**
 * @class
 */
var Screen = (function () {
  /**
   *
   * @param {Game} game
   * @constructs
   */
  var constructor = function (game) {
    this.game = game;
  };
  constructor.prototype = {
    constructor: constructor,
    "create": function () {

    },
    "enter": function () {
      this.game.stage.backgroundColor = 'blue';
    },
    "leave": function () {},
    "update": function () {},
    "render": function () {}
  };

  return constructor;
})();
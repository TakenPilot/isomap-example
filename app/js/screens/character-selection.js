/**
 * @class
 */
var CharacterSelectionScreen = (function () {
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
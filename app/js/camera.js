/**
 * @@class
 */
var Camera = (function () {
  /**
   * @constructs
   * @param game
   * @param options
   */
  var constructor = function (game, options) {
    options = options || {};
    this.game = game;
    this.o = options.o || {x: 0, y: 0, z: 0};
    this.t = options.t;
  };
  constructor.prototype = {
    constructor: constructor
  };
  return constructor;
})();
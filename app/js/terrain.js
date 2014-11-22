/**
 * @@class
 */
var Terrain = (function () {
  /**
   * @constructs
   * @param game
   * @param options
   */
  var constructor = function (game, options) {
    options = options || {};
    this.game = game;
    this.p = options.p || {x: "0", y: "0", z: "0"};
    this.o = options.o || {x: 0, y: 0, z: 0};
  };
  constructor.prototype = {
    constructor: constructor
  };

  //allow to emit events
  Eventify.enable(constructor);

  return constructor;
})();
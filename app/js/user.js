/**
 * @@class
 */
var User = (function () {
  /**
   * @constructs
   * @param game
   * @param options
   */
  var constructor = function (game, options) {
    options = options || {};
    this.game = game;
    this.id = options.id;
  };
  constructor.prototype = {
    constructor: constructor
  };

  //allow to emit events
  Eventify.enable(constructor);

  return constructor;
})();
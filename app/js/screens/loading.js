/**
 * @class
 */
var LoadingScreen = (function () {
  /**
   * @param {Game} game
   * @param {{}} [options]
   * @constructs
   */
  var constructor = function (game, options) {
    options = options || {};
    this.game = game;
    this.tasks = options.tasks;
    this.after = options.after;
  };
  constructor.prototype = {
    "create": function () {},
    "enter": function () {
      var self = this;
      var game = this.game;

      game.stage.backgroundColor = 'black';

      //start tasks, then when done, remove self
      Promise.all(_.map(this.tasks, function(task) {
        console.log('LoadingScreen task');
        return task();
      })).then(function (tasks) {
        console.log('LoadingScreen remove self');
        game.remove(self);
      });
    },
    "leave": function () {
      game.add(this.after);
    },
    "update": function () {},
    "render": function () {}
  };
  return constructor;
})();
/**
 * @class
 */
var SplashScreen = (function () {
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
      console.log('SplashScreen create');
    },
    "enter": function () {
      var self = this;
      console.log('SplashScreen enter');
      this.game.stage.backgroundColor = 'blue';

      //start tasks, then when done, remove self
      setTimeout(function () {
        console.log('SplashScreen remove self');
        game.remove(self);
      }, 3000);
    },
    "leave": function () {
      console.log('SplashScreen leave');
      this.game.add(new SignInScreen(this.game));
    },
    "update": function () {},
    "render": function () {}
  };
  return constructor;
})();
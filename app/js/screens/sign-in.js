/**
 * @class
 */
var SignInScreen = (function () {

  var mesh;

  /**
   *
   * @param {Game} game
   * @constructs
   */
  var constructor = function (game) {
    this.game = game;
    this.fade = 0;
  };
  constructor.prototype = {
    "create": function () {},
    "enter": function () {
      this.game.stage.backgroundColor = 'black';

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        35,         // Field of view
        window.innerWidth / window.innerHeight,  // Aspect ratio
        .1,         // Near
        10000       // Far
      );
      camera.position.set( -15, 10, 15 );
      camera.lookAt( scene.position );

      var geometry = new THREE.BoxGeometry( 5, 5, 5 );
      var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
      mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );

      var light = new THREE.PointLight( 0xFFFF00 );
      light.position.set( -10, 10, 10 );
      light.intensity = 0.01;
      scene.add( light );

      game.setScene(scene);
      game.setCamera(camera);
      this.light = light;
      this.camera = camera;
      this.fade = 0.01; //fadeIn
    },
    "leave": function () {
      var d = Promise.defer();
      this.on('fadedOut', function () {
        d.resolve();
      });
      return d.promise;
    },
    "update": function () {},
    "render": function () {
      if (this.fade !== 0) {
        if (this.fade < 0) {
          this.light.intensity /= 2;
          if (this.light.intensity < 0.1) {
            this.light.intensity = 0;
            this.fade = 0;
            this.trigger('fadedOut')
          }
        } else if (this.fade > 0) {
          this.light.intensity += this.fade;
          if (this.light.intensity > 1) {
            this.light.intensity = 1;
            this.fade = 0;
            this.trigger('fadedIn')
          }
        }
      }


      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    }
  };

  Eventify.enable(constructor.prototype);

  return constructor;
})();
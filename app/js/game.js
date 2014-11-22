/**
 * @class
 */
var Game = (function(window, document, io) {
  var user;
  var socket = io();
  var components = [];
  var stage = {
    backgroundColor: 'black'
  };
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    35,         // Field of view
    window.innerWidth / window.innerHeight,  // Aspect ratio
    .1,         // Near
    10000       // Far
  );

  //listen for changes to users, especially our user
  subscribe('/users', function (e) {
    var data,
      method = e.method;
    console.log(e);

    if (method === 'sign-in' || method === 'sign-out') {
      _.assign(user, JSON.parse(e.message));
    } else if (method === 'update' || method === 'find' || method === 'put') {
      data = JSON.parse(message);
      //if it's an update for us
      if (user.id === data.id) {
        _.assign(user, data);
      }
    }
  });

  /**
   * Start listening to changes to a resource
   * @param {string} resource
   * @param {function} fn
   */
  function subscribe(resource, fn) {
    socket.on(resource, function (data) {
      var result, end = data.indexOf(' ');
      if (end !== -1) {
        result = {resource: resource, method: data.substr(0, end), message: data.substr(end + 1)};
      } else {
        result = {resource: resource, method: data};
      }
      fn(result);
    });
  }

  /**
   * Each runtime loop, run update for each component, and then render for each component
   */
  function render() {
    _.each(components, function (component) {
      component.update();
    });
    _.each(components, function (component) {
      component.render();
    });
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }

  /**
   * Add a component to the list of running components
   * If not yet created, creates component, then allows it to enter
   * @param {{enter: function, isCreated: boolean}} component
   */
  function add(component) {
    var creation;
    if (!component.isCreated && component.create) {
      creation = component.create();
    }
    Promise.resolve(creation)
      .then(function () {
        return component.enter();
      })
      .then(function () {
        components.push(component);
      });
  }

  /**
   * Remove a component from the list of running components
   * @param {{leave: function}} component
   */
  function remove(component) {
    var index = components.indexOf(component);
    if (index > -1) {
      Promise.resolve(component.leave()).then(function () {
          if (components[index] !== component) {
            index = components.indexOf(component);
          }
          if (index > -1) {
            components.splice(index, 1);
          }
        });
    }
  }

  function signIn() {
    socket.emit('get', '/users/sign-in {}');
  }


  function signOut() {
    socket.emit('get', '/users/sign-out {}')
  }
  /**
   * @constructs
   */
  var constructor = function () {
    document.body.appendChild( renderer.domElement );
    user = new User(this); //ourselves

    socket.emit('get', '/users/sign-in {}');

    //accessible fields
    this.stage = stage;
    this.socket = socket;
    this.user = user;

    //begin
    render();
  };
  constructor.prototype = {
    constructor: constructor,
    add: add,
    remove: remove,
    subscribe: subscribe,
    signIn: signIn,
    signOut: signOut,
    setScene: function (s) {
      scene = s;
    },
    setCamera: function (c) {
      camera = c;
    }
  };
  return constructor;
})(window, document, io);
import {
  getWarpSpeedController
} from '../../dist/index';

function demo() {
  // Create and assign WarpSpeed object:
  const warpSpeedController = getWarpSpeedController();
  /*
  Could have passed three parameters here, but they are optional.
  numberOfStars - Defaults to 300
  starColor - String, must be in a format that canvas can accept (css color string thingy e.g 'white', rgb, or hex). Defaults to a light blue color.
  starVelocities - Number representing how quickly the stars move into focus. Defaults to 3.
   */

  // Mount warpspeed canvas to DOM
  const canvasWrapper = document.querySelector('#center');
  warpSpeedController.mountCanvasTo(canvasWrapper);
  /*
  The canvas defaults to fill the element it is mounted to, but you can override this
  with your own styling if you fancy. It is created with an id of 'warpSpeedCanvas'. 
  */

  // Start drawing on said canvas
  warpSpeedController.render();

  // The initial parameters can be set post-creation as well
  // warpSpeed.setNumberOfStars(1000);
  // warpSpeed.setStarColor('rgb(255, 0, 255, 0.5)');
  // warpSpeed.setStarVelocities(10);
}

demo();

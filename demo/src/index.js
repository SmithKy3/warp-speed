import {
  getWarpSpeedController
} from '../../dist/index';

function demo() {
  const warpSpeedController = getWarpSpeedController();
  console.log(warpSpeedController);
  const canvasWrapper = document.querySelector('#center');
  warpSpeedController.mountCanvasTo(canvasWrapper);
  warpSpeedController.render();
}

demo();

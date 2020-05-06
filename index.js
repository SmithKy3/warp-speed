import { WarpSpeed } from './src/WarpSpeed';

function test() {
  const div = document.querySelector('#center');
  const warpSpeed = WarpSpeed();

  warpSpeed.mountCanvas(div);
  warpSpeed.render();
}

test();

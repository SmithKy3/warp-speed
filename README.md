# warp-speed

A small NPM package that can be used to grab a HTML5 canvas running a star wars style warp speed animation.

## Example - setting this as the background of some element

```javascript
import { getWarpSpeedController } from 'warpspeed';

function chewiePunchIt() {
  const warpSpeedController = getWarpSpeedController();
  const someContainer = document.querySelector('#someContainerId');
  warpSpeed.mountCanvasTo(someContainer); // Renders in as a plain black canvas with no animation
  warpSpeed.render(); // Kicks off the animation

  // You can then...

  // Change the number of stars being rendered:
  warpSpeedController.setNumberOfStars(3000); // Default is 2000

  // Change the color of the stars:
  warpSpeedController.setStarColor('rgb(255, 0, 0)'); // Default and my favourite is 'rainbow'
  // Note: Colour must be a valid CSS colour string, 'rainbow' is the only exception here

  // Change the size of the stars:
  warpSpeedController.setStarRadii(5); // Default is 1.5

  // Change the speed of the stars:
  warpSpeedController.setStarVelocities(50); // Default is 5 (50 makes me feel a bit motion sick)

  /* All of the above parameters can be passed as parameters when calling getWarpSpeedController but are optional */

  // And finally, you can remove the canvas from the DOM:
  warpSpeedController.dismountCanvas();
}
```

## Side notes on usage:

I've given the canvas some inline style so that it has a black background and fills the element it is mounted to, but feel free to add your own styles, it has an ID of 'warpSpeedCanvas'.
On mounting of the canvas and on page resize, the canvas will automatically set its width and height properties to match it's clientWidth / clientHeight, meaning the resolution should always look just fine. It will also restart the drawing process on resize so that the animation always fills the current resolution.

## Demo

To see a demo and have a wee play without the effort of writing much/any code of your own, do the following:

1. Clone / download the source code - https://github.com/SmithKy3/warp-speed
2. Open a CLI in the directory
3. `npm i`
4. `npm run demo`
5. Go to the URL printed to the console (should be localhost:1234)

You can find the warpSpeedController printed in the console and can be stored and used from there.

## Why?

So I've been making a small space simulator in JS (don't ask) and this was a side thought while making that. Something along the lines of "why is it logging [Object object]... I wonder how hard the star wars warp drive effect thing would be to recreate..."

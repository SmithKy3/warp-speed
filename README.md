# warp-speed

A small NPM package that can be used to grab a HTML5 canvas running a star wars style warp speed animation.

## Example - setting this as a background for your entire page

```javascript
import { WarpSpeed } from 'warpspeed';

function chewiePunchIt() {
  const warpSpeed = WarpSpeed();
  const someContainer = document.querySelector('#someContainerId');
  warpSpeed.mountCanvasTo(someContainer);
  warpSpeed.render();

  /* Say i want to...
    ... increase the number of stars whizzing past us:
    warpSpeed.setNumberOfStars(1000);
    
    ... or increase the speed of said whizzing:
    warpSpeed.setStarVelocities(10);

    ... or make all of the stars red:
    warpSpeed.setStarColor('red'); || warpSpeed.setStarColor('#ff0000'); || warpSpeed.setStarColor('rgb(255, 0, 0)');
  */
}
```

## Side notes on usage:

I've given the canvas some inline style so that it has a black background and fills the element it is mounted to, but feel free to add your own styles, it has an ID of 'warpSpeedCanvas'.
On mounting of the canvas and on page resize, the canvas will automatically set its width and height properties to the width and height it is styled to, meaning the resolution should always look just fine. It will also restart the drawing process on resize so that the animation always fills the current resolution.

## Demo

To see a demo and have a wee play without the effort of writing muich/any code of your own, go to the package repository (here you lazy git (get it... git?): https://github.com/SmithKy3/warp-speed)

1. Clone / download it
2. Open a CLI in the directory
3. `npm i`
4. `npm run demo`
5. Go to the URL printed to the console (should be localhost:1234)

## Why?

So I've been making a small space simulator in JS (don't ask) and this was a side thought while making that. Something along the lines of "why is it logging [Object object]... I wonder how hard the star wars warp drive effect thing would be to recreate..."

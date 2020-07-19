import { Star, getStars, drawStars } from './Star';
import { getCanvas, sizeCanvas } from './Canvas';

export interface WarpSpeedController {
  mountCanvasTo(mountPoint: HTMLElement): void;
  dismountCanvas(): void;
  setNumberOfStars(num: number): void;
  setStarColor(color: string): void;
  setStarRadii(r: number): void;
  setStarVelocities(num: number): void;
  render(): void;
}

const TIME_PER_FRAME = 1000 / 45;

export function getWarpSpeedController(
  numberOfStars = 750,
  starsColor = 'rainbow',
  starsRadius = 3,
  starsVelocity = 5
): WarpSpeedController {
  let starQuantity = numberOfStars;
  let color = starsColor;
  let radius = starsRadius;
  let velocity = starsVelocity;

  let frameID: number; // string returned by requestAnimationFrame, used for cancelling frame if we want to stop the animation
  let previousTimeStamp: number; // time stamp at time of last frame, in ms

  const stars = new Array<Star>();
  const canvas = getCanvas();

  // Empty stars array when color/radius need to be changed on all
  function clearStars(): void {
    stars.length = 0;
  }

  // Generate some number of stars, or remove some number from the array if need be. Relies on starQuantity property
  function updateNumberOfStars(): void {
    if (starQuantity > stars.length) {
      const { clientWidth, clientHeight } = canvas;
      const starsRequired = starQuantity - stars.length;
      stars.push(
        ...getStars(
          starsRequired,
          clientWidth * 0.25,
          clientHeight * 0.25,
          color,
          radius
        )
      );
    } else if (starQuantity < stars.length) {
      const starsToRemove = stars.length - starQuantity;
      stars.splice(-starsToRemove, starsToRemove);
    }
  }

  // Used to decline Z position of stars to give the perspective feel
  // does so using real time measurements to ensure a consistent frame rate feel
  // (emphasis on feel because real frame rate is basically as fast as the client machine can fir off an animationFrame event)
  async function updateStarPositions(): Promise<void> {
    const currentTimeStamp = performance.now();
    const timeDelta = currentTimeStamp - previousTimeStamp;
    const distanceDelta = velocity * (timeDelta / TIME_PER_FRAME);

    for (const star of stars) {
      if (star.z <= velocity) {
        star.reset();
        continue;
      }

      star.z -= distanceDelta;
    }

    previousTimeStamp = currentTimeStamp;
  }

  // Recursive animation drawing, uses async to try and avoid requesting a new frame while we are till computing and getting hang/FPS drop
  async function draw(): Promise<void> {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error(`Couldn't get context of warpSpeed canvas`);
    }

    await drawStars(stars, context)
      .then(updateStarPositions)
      .then(() => (frameID = window.requestAnimationFrame(draw)));
  }

  function onResize() {
    window.cancelAnimationFrame(frameID);
    clearStars();
    sizeCanvas(canvas);
    updateNumberOfStars();
    previousTimeStamp = performance.now();
    frameID = window.requestAnimationFrame(draw);
  }

  return {
    mountCanvasTo(mountPoint: HTMLElement): void {
      mountPoint.appendChild(canvas);
      sizeCanvas(canvas);

      if (!stars.length || stars.length !== starQuantity) {
        updateNumberOfStars();
      }
    },

    dismountCanvas(): void {
      if (!canvas.parentNode) {
        return;
      }

      window.cancelAnimationFrame(frameID);
      canvas.parentNode.removeChild(canvas);
      window.removeEventListener('resize', onResize);
    },

    setNumberOfStars(num: number): void {
      starQuantity = num;
      updateNumberOfStars();
    },

    setStarColor(newColour: string): void {
      color = newColour;
      clearStars();
      updateNumberOfStars();
    },

    setStarRadii(r: number): void {
      radius = r;
      clearStars();
      updateNumberOfStars();
    },

    setStarVelocities(num: number): void {
      velocity = num;
    },

    render(): void {
      previousTimeStamp = performance.now();
      frameID = window.requestAnimationFrame(draw);

      window.addEventListener('resize', onResize);
    },
  };
}

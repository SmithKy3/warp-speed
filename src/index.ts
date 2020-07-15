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

export function getWarpSpeedController(
  numberOfStars = 2000,
  starsColor = 'rainbow',
  starsRadius = 1.5,
  starsVelocity = 5
): WarpSpeedController {
  let starQuantity = numberOfStars;
  let color = starsColor;
  let radius = starsRadius;
  let velocity = starsVelocity;
  let animationFrameId: number;
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
          clientWidth * 0.5,
          clientHeight * 0.5,
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
  async function updateStarPositions(): Promise<void> {
    for (const star of stars) {
      if (star.z <= velocity) {
        star.reset();
        continue;
      }

      star.z -= velocity;
    }
  }

  // Recursive animation drawing, uses async to try and avoid requesting a new frame while we are till computing and getting hang/FPS drop
  function draw(): void {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error(`Couldn't get context of warpSpeed canvas`);
    }

    drawStars(stars, context)
      .then(updateStarPositions)
      .then(() => (animationFrameId = window.requestAnimationFrame(draw)));
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

      canvas.parentNode.removeChild(canvas);
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
      window.requestAnimationFrame(draw);
    },
  };
}

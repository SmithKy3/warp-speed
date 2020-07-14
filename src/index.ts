import { Star, getStars, drawStars } from './Star';
import { getCanvas, sizeCanvas } from './Canvas';

export interface WarpSpeedController {
  mountCanvasTo(mountPoint: HTMLElement): void;
  dismountCanvas(): void;
  setNumberOfStars(num: number): void;
  setStarColor(color: string): void;
  setStarVelocities(num: number): void;
  render(): void;
}

export function getWarpSpeedController(
  numberOfStars = 5000,
  starsColor = '#c7e7ff',
  starsVelocity = 2
): WarpSpeedController {
  let starQuantity = numberOfStars;
  let color = starsColor;
  let velocity = starsVelocity;
  let animationFrameId: number;
  const stars = new Array<Star>();
  const canvas = getCanvas();

  function updateNumberOfStars(): void {
    if (starQuantity > stars.length) {
      const { clientWidth, clientHeight } = canvas;
      const starsRequired = starQuantity - stars.length;
      stars.push(
        ...getStars(starsRequired, clientWidth * 0.5, clientHeight * 0.5)
      );
    } else if (starQuantity < stars.length) {
      const starsToRemove = stars.length - starQuantity;
      stars.splice(-starsToRemove, starsToRemove);
    }
  }

  async function updateStarPositions(): Promise<void> {
    for (const star of stars) {
      if (star.z <= velocity) {
        star.reset();
        continue;
      }

      star.z -= velocity;
    }
  }

  function draw(): void {
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error(`Couldn't get context of warpSpeed canvas`);
    }

    drawStars(stars, context, color)
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

    setStarColor(color: string): void {
      starsColor = color;
    },

    setStarVelocities(num: number): void {
      velocity = num;
    },

    render(): void {
      window.requestAnimationFrame(draw);
    },
  };
}

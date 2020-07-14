export interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  reset(): void;
}

const DEFAULT_STAR_RADIUS = 1;

function getRandomNumber(min: number, max: number, round = false): number {
  const result = Math.random() * (max - min) + min;

  return round ? Math.round(result) : result;
}

function getStar(maxX: number, maxY: number): Star {
  return {
    x: getRandomNumber(-maxX, maxX),
    y: getRandomNumber(-maxY, maxY),
    z: getRandomNumber(0, maxX),
    color: `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
      0,
      255
    )}, ${getRandomNumber(0, 255)})`,
    reset() {
      this.z = getRandomNumber(0, maxX);
      this.color = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
        0,
        255
      )}, ${getRandomNumber(0, 255)})`;
    },
  };
}

export function getStars(numberOfStars: number, maxX: number, maxY: number) {
  const stars = new Array<Star>();

  for (let i = 0; i++ < numberOfStars; ) {
    stars.push(getStar(maxX, maxY));
  }

  return stars;
}

export async function drawStars(
  stars: Star[],
  context: CanvasRenderingContext2D,
  starColor: string
): Promise<void> {
  const { width, height } = context.canvas;
  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
  context.translate(halfWidth, halfHeight);
  for (const star of stars) {
    const depthCoefficient = star.z / halfWidth;
    const X = Math.round(star.x / depthCoefficient);
    const Y = Math.round(star.y / depthCoefficient);

    context.beginPath();
    context.arc(X, Y, DEFAULT_STAR_RADIUS, 0, 2 * Math.PI);
    context.fillStyle = star.color;
    context.fill();
    context.closePath();
  }
}

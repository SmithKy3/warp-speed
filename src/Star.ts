export interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  reset(): void;
}

function getRandomNumber(min: number, max: number, round = false): number {
  const result = Math.random() * (max - min) + min;

  return round ? Math.round(result) : result;
}

function getStar(
  maxX: number,
  maxY: number,
  color: string,
  radius: number
): Star {
  return {
    x: getRandomNumber(-maxX, maxX),
    y: getRandomNumber(-maxY, maxY),
    z: getRandomNumber(0, maxX),
    color,
    radius,
    reset() {
      this.z = getRandomNumber(0, maxX);
    },
  };
}

export function getStars(
  numberOfStars: number,
  maxX: number,
  maxY: number,
  starColor: string,
  radius: number
) {
  const stars = new Array<Star>();

  for (let i = 0; i++ < numberOfStars; ) {
    const color =
      starColor === 'rainbow'
        ? `rgb(
          ${getRandomNumber(0, 255, true)},
          ${getRandomNumber(0, 255, true)},
          ${getRandomNumber(0, 255, true)})`
        : starColor;

    stars.push(getStar(maxX, maxY, color, radius));
  }

  return stars;
}

export async function drawStars(
  stars: Star[],
  context: CanvasRenderingContext2D
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
    context.fillStyle = star.color;
    context.arc(X, Y, star.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
}

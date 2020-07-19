import {
  negate,
  normalize,
  scale,
  normal,
  add,
  magnitude,
} from './VectorHelper';

export interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  reset(): void;
}

const MAX_TRAIL_SIZE = 50;

function getRandomNumber(min: number, max: number, round = false): number {
  const result = Math.random() * (max - min) + min;

  return round ? Math.round(result) : result;
}

function getStar(
  maxX: number,
  maxY: number,
  starColor: string,
  radius: number
): Star {
  const getNewColor = () => `rgb(
    ${getRandomNumber(0, 255, true)}, 
    ${getRandomNumber(0, 255, true)}, 
    ${getRandomNumber(0, 255, true)}
  )`;

  let x = getRandomNumber(-maxX, maxX);
  let y = getRandomNumber(-maxY, maxY);
  let z = getRandomNumber(0, maxX);

  return {
    x,
    y,
    z,
    color: starColor !== 'rainbow' ? starColor : getNewColor(),
    radius,
    reset() {
      this.x = getRandomNumber(-maxX, maxX);
      this.y = getRandomNumber(-maxY, maxY);
      this.z = getRandomNumber(0, maxX);
    },
  };
}

export function getStars(
  numberOfStars: number,
  maxX: number,
  maxY: number,
  color: string,
  radius: number
) {
  const stars = new Array<Star>();

  for (let i = 0; i++ < numberOfStars; ) {
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
    const x = Math.round(star.x / depthCoefficient);
    const y = Math.round(star.y / depthCoefficient);

    context.beginPath();
    context.fillStyle = star.color;
    context.arc(x, y, star.radius, 0, 2 * Math.PI);
    await drawTrail({ x, y }, star.radius, halfWidth, context);
    context.closePath();
    context.fill();
  }
}

async function drawTrail(
  starCenter: { x: number; y: number },
  starRadius: number,
  maxTrailWidth: number,
  context: CanvasRenderingContext2D
): Promise<void> {
  const halfRadius = starRadius * 0.5;
  const trailDirection = negate(normalize(starCenter));
  const perp = normal(trailDirection);
  const trailSize = MAX_TRAIL_SIZE * (magnitude(starCenter) / maxTrailWidth);

  const P1 = add(starCenter, scale(perp, halfRadius));
  const P2 = add(starCenter, scale(trailDirection, trailSize));
  const P3 = add(starCenter, scale(perp, -halfRadius));

  context.moveTo(P1.x, P1.y);
  context.lineTo(P2.x, P2.y);
  context.lineTo(P3.x, P3.y);

  return;
}

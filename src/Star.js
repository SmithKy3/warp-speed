function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function Star(canvas) {
  let width;
  let height;
  let x;
  let y;
  let z;
  const ctx = canvas.getContext('2d');

  function init() {
    width = canvas.clientWidth * 0.5;
    height = canvas.clientWidth * 0.5;
    x = getRandomInteger(-width, width);
    y = getRandomInteger(-height, height);
    z = getRandomInteger(width * 0.5, width);
  }

  function getTrailPath(startX, startY, endX, endY, startWidth, endWidth) {
    const xDirectionVec = endX - startX;
    const yDirectionVec = endY - startY;
    const trailAngle = Math.atan2(xDirectionVec, yDirectionVec);

    const path = new Path2D();
    path.arc(startX, startY, startWidth / 2, trailAngle, trailAngle + Math.PI);
    path.arc(endX, endY, endWidth / 2, trailAngle + Math.PI, trailAngle);
    path.closePath();

    return path;
  }

  init();

  return {
    draw() {
      ctx.save();
      ctx.beginPath();
      const currentDepthCoefficient = width / z;
      const currentX = x * currentDepthCoefficient;
      const currentY = y * currentDepthCoefficient;
      const R = currentDepthCoefficient * 0.5;
      ctx.arc(currentX, currentY, R, 0, 2 * Math.PI);
      ctx.fill();

      if (z > width * 0.1) {
        const previousDepthCoefficient = width / (z + 20);
        const previousX = x * previousDepthCoefficient;
        const previousY = y * previousDepthCoefficient;
        const trail = getTrailPath(
          currentX,
          currentY,
          previousX,
          previousY,
          R,
          R / 10
        );
        ctx.fill(trail);
      }

      ctx.closePath();
      ctx.restore();
    },

    updatePosition(velocity) {
      z -= velocity;

      if (z <= 1) {
        init();
        return;
      }
    },
  };
}

function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Star(canvas) {
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

function WarpSpeed(
  numberOfStars = 300,
  starColor = '#c7e7ff',
  starVelocities = 3
) {
  let starsToGen = numberOfStars;
  let color = starColor;
  let velocity = starVelocities;
  let animationRequestId;
  const stars = [];

  const canvas = document.createElement('canvas');
  canvas.id = 'warpSpeedCanvas';
  canvas.setAttribute(
    'style',
    'background-color:black; width:100%; height:100%;'
  );

  function sizeCanvas() {
    console.log(canvas);
    const { clientWidth, clientHeight } = canvas;
    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const xTranslation = canvas.width / 2;
    const yTranslation = canvas.height / 2;
    ctx.translate(xTranslation, yTranslation);
  }

  function generateStars() {
    stars.length = 0;
    for (let i = starsToGen; i > 0; i--) {
      stars.push(Star(canvas));
    }
  }

  function render() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    const drawFrame = () => {
      const { width, height } = canvas;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2, height / 2);
      stars.forEach((star) => {
        star.draw();
        star.updatePosition(velocity);
      });

      animationRequestId = window.requestAnimationFrame(drawFrame);
    };

    animationRequestId = window.requestAnimationFrame(drawFrame);
  }

  window.addEventListener('resize', () => {
    window.cancelAnimationFrame(animationRequestId);
    sizeCanvas();
    generateStars();
    render();
  });

  generateStars();

  return {
    mountCanvasTo(mountPoint) {
      mountPoint.appendChild(canvas);
      sizeCanvas();
    },

    setNumberOfStars(num) {
      starsToGen = num;
      generateStars();
    },

    setStarColor(starColor) {
      color = starColor;
    },

    setStarVelocities(num) {
      velocity = num;
    },

    render,
  };
}

exports.WarpSpeed = WarpSpeed;

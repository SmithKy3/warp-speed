import { Star } from './Star';

export function WarpSpeed(
  numberOfStars = 300,
  starColor = '#c7e7ff',
  starVelocity = 3
) {
  let starsToGen = numberOfStars;
  let color = starColor;
  let velocity = starVelocity;
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
    mountCanvas(mountPoint) {
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

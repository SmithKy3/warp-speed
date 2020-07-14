export function getCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.id = 'warpSpeedCanvas';
  canvas.setAttribute(
    'style',
    'background-color:black; width:100%; height:100%;'
  );

  return canvas;
}

export async function sizeCanvas(canvas: HTMLCanvasElement): Promise<void> {
  const { clientWidth, clientHeight } = canvas;
  canvas.width = clientWidth;
  canvas.height = clientHeight;
}

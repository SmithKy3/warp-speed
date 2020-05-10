interface WarpSpeedObject {
  mountCanvasTo(mountPoint: HTMLElement): void;
  setNumberOfStars(num: number): void;
  setStarColor(color: string): void;
  setStarVelocities(num: number): void;
  render(): void;
}

export declare function WarpSpeed(
  numberOfStars?: number,
  starColor?: string,
  starVelocities?: number
): WarpSpeedObject;

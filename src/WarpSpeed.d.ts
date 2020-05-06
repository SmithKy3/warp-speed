declare module 'warpspeed' {
  interface WarpSpeedObject {
    mountCanvas(mountPoint: HTMLElement): void;
    setNumberOfStars(num: number): void;
    setStarColor(color: string): void;
    setStarVelocities(num: number): void;
    render(): void;
  }

  export function WarpSpeed(
    numberOfStars?: number,
    starColor?: string,
    starVelocities?: number
  ): WarpSpeedObject;
}

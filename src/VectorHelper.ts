interface Vec2 {
  x: number;
  y: number;
}

export function negate({ x, y }: Vec2): Vec2 {
  return {
    x: x * -1,
    y: y * -1,
  };
}

export function magnitude({ x, y }: Vec2): number {
  return (x ** 2 + y ** 2) ** 0.5;
}

export function normalize({ x, y }: Vec2): Vec2 {
  const mag = magnitude({ x, y });

  return {
    x: x / mag,
    y: y / mag,
  };
}

export function scale({ x, y }: Vec2, scalar: number): Vec2 {
  return {
    x: x * scalar,
    y: y * scalar,
  };
}

export function normal({ x, y }: Vec2): Vec2 {
  return {
    x: y,
    y: -x,
  };
}

export function add(A: Vec2, B: Vec2): Vec2 {
  return {
    x: A.x + B.x,
    y: A.y + B.y,
  };
}

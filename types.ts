
export interface CardData {
  id: string;
  title: string;
  iconType: 'chess' | 'basketball' | 'dragon' | 'starve' | 'running' | 'career';
  accentColor: string;
  copy: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  iconType: string;
}

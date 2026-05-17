/* 通用工具函数 */

export function cn(...inputs: (string | undefined | false | null)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

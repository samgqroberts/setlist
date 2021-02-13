export function isNumber(data: unknown): data is number {
  return typeof data === 'number';
}

export function isNumber(data: unknown): data is number {
  return typeof data === 'number';
}

export function isString(data: unknown): data is number {
  return typeof data === 'string';
}

export function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`);
}

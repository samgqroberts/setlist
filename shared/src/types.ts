export function isNumber(data: unknown): data is number {
  return typeof data === 'number';
}

export function isString(data: unknown): data is number {
  return typeof data === 'string';
}

export function isStringOrUndefined(data: unknown): data is string | undefined {
  return isString(data) || data === undefined;
}

export function assertNever(x: never): never {
  throw new Error(`Unexpected: ${x}`);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = exports.isStringOrUndefined = exports.isString = exports.isNumber = void 0;
function isNumber(data) {
    return typeof data === 'number';
}
exports.isNumber = isNumber;
function isString(data) {
    return typeof data === 'string';
}
exports.isString = isString;
function isStringOrUndefined(data) {
    return isString(data) || data === undefined;
}
exports.isStringOrUndefined = isStringOrUndefined;
function assertNever(x) {
    throw new Error(`Unexpected: ${x}`);
}
exports.assertNever = assertNever;
//# sourceMappingURL=types.js.map
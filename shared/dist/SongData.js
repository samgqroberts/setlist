"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSongData = exports.isSongDataAlias = exports.aliasIndicator = exports.isSongDataWithPlayInfo = exports.isPlayInfo = exports.isPlayInfoNeverPlayed = exports.isPlayInfoPlayed = void 0;
const types_1 = require("./types");
function isPlayInfoPlayed(data) {
    const as = data;
    return types_1.isNumber(as === null || as === void 0 ? void 0 : as.times) && types_1.isString(as === null || as === void 0 ? void 0 : as.debut) && types_1.isString(as === null || as === void 0 ? void 0 : as.last) && types_1.isNumber(as === null || as === void 0 ? void 0 : as.gap);
}
exports.isPlayInfoPlayed = isPlayInfoPlayed;
function isPlayInfoNeverPlayed(data) {
    const as = data;
    return (as === null || as === void 0 ? void 0 : as.times) === 0 && types_1.isNumber(as === null || as === void 0 ? void 0 : as.gap);
}
exports.isPlayInfoNeverPlayed = isPlayInfoNeverPlayed;
function isPlayInfo(data) {
    return isPlayInfoPlayed(data) || isPlayInfoNeverPlayed(data);
}
exports.isPlayInfo = isPlayInfo;
function isSongDataWithPlayInfo(data) {
    const as = data;
    return types_1.isString(as === null || as === void 0 ? void 0 : as.songName) && types_1.isStringOrUndefined(as === null || as === void 0 ? void 0 : as.originalArtist) && isPlayInfo(as === null || as === void 0 ? void 0 : as.playInfo);
}
exports.isSongDataWithPlayInfo = isSongDataWithPlayInfo;
exports.aliasIndicator = 'Alias of';
function isSongDataAlias(data) {
    const as = data;
    return types_1.isString(as === null || as === void 0 ? void 0 : as.songName) && types_1.isStringOrUndefined(as === null || as === void 0 ? void 0 : as.originalArtist) && types_1.isString(as === null || as === void 0 ? void 0 : as.aliasOf);
}
exports.isSongDataAlias = isSongDataAlias;
function isSongData(data) {
    return isSongDataWithPlayInfo(data) || isSongDataAlias(data);
}
exports.isSongData = isSongData;
//# sourceMappingURL=SongData.js.map
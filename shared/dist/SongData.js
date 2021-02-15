"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSongData = exports.isSongDataFoundInDiscography = exports.foundInDiscographyIndicator = exports.isSongDataAlias = exports.aliasIndicator = exports.isSongDataWithPlayInfo = exports.isPlayInfo = void 0;
const types_1 = require("./types");
function isPlayInfo(data) {
    const as = data;
    return types_1.isNumber(as === null || as === void 0 ? void 0 : as.times) && types_1.isString(as === null || as === void 0 ? void 0 : as.debut) && types_1.isString(as === null || as === void 0 ? void 0 : as.last) && types_1.isNumber(as === null || as === void 0 ? void 0 : as.gap);
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
exports.foundInDiscographyIndicator = 'Found in Discography';
function isSongDataFoundInDiscography(data) {
    const as = data;
    return types_1.isString(as === null || as === void 0 ? void 0 : as.songName) && types_1.isStringOrUndefined(as === null || as === void 0 ? void 0 : as.originalArtist) && (as === null || as === void 0 ? void 0 : as.foundInDiscography) === true;
}
exports.isSongDataFoundInDiscography = isSongDataFoundInDiscography;
function isSongData(data) {
    return isSongDataWithPlayInfo(data) || isSongDataAlias(data) || isSongDataFoundInDiscography(data);
}
exports.isSongData = isSongData;
//# sourceMappingURL=SongData.js.map
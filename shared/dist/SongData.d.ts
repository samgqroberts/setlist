export interface PlayInfo {
    times: number;
    debut: string;
    last: string;
    gap: number;
}
export declare function isPlayInfo(data: unknown): data is PlayInfo;
export interface SongDataWithPlayInfo {
    songName: string;
    originalArtist?: string;
    playInfo: PlayInfo;
}
export declare function isSongDataWithPlayInfo(data: unknown): data is SongDataWithPlayInfo;
export interface SongDataAlias {
    songName: string;
    originalArtist?: string;
    aliasOf: string;
}
export declare const aliasIndicator = "Alias of";
export declare function isSongDataAlias(data: unknown): data is SongDataAlias;
export interface SongDataFoundInDiscography {
    songName: string;
    originalArtist?: string;
    foundInDiscography: true;
}
export declare const foundInDiscographyIndicator = "Found in Discography";
export declare function isSongDataFoundInDiscography(data: unknown): data is SongDataFoundInDiscography;
export declare type SongData = SongDataWithPlayInfo | SongDataAlias | SongDataFoundInDiscography;
export declare function isSongData(data: unknown): data is SongData;

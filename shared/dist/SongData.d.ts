export interface PlayInfoPlayed {
    times: number;
    debut: string;
    last: string;
    gap: number;
}
export declare function isPlayInfoPlayed(data: unknown): data is PlayInfoPlayed;
export interface PlayInfoNeverPlayed {
    times: 0;
    gap: number;
}
export declare function isPlayInfoNeverPlayed(data: unknown): data is PlayInfoNeverPlayed;
export declare type PlayInfo = PlayInfoPlayed | PlayInfoNeverPlayed;
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
export declare type SongData = SongDataWithPlayInfo | SongDataAlias;
export declare function isSongData(data: unknown): data is SongData;

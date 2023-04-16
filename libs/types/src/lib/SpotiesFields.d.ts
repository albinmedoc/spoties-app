type SpotiesSearchType = 'search';
type SpotiesCoverImageType = 'cover-image';
type SpotiesTextType = 'text';
type SpotiesRecordNameType = 'record-name';
type SpotiesArtistNameType = 'artist-name';

export type SpotiesFieldType = SpotiesSearchType | SpotiesCoverImageType | SpotiesTextType | SpotiesRecordNameType | SpotiesArtistNameType;

export interface SpotiesSearchSettings {
    type: 'search';
    required: boolean;
    name: 'search';
}

export interface SpotiesCoverImageSettings {
    type: 'cover-image';
    name: string;
    /* 
        Later we want to specify the aspect ratio for the image
        aspectRatio: number;
    */
    minWidth?: number;
}

export interface SpotiesTextSettings {
    type: 'text';
    required: boolean;
    label: string;
    name: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

export interface SpotiesRecordNameSettings extends SpotiesTextSettings {
    type: 'record-name';
    name: 'Record Name';
}

export interface SpotiesArtistNameSettings extends SpotiesTextSettings {
    type: 'artist-name';
    name: 'Artist Name';
}

export type SpotiesFieldSettings = SpotiesSearchSettings | SpotiesCoverImageSettings | SpotiesTextSettings | SpotiesRecordNameSettings | SpotiesArtistNameSettings;

export type SpotiesSettings = Array<SpotiesFieldSettings>;

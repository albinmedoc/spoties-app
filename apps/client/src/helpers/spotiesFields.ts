import type { SpotiesFieldSettings, SpotiesFieldType } from '@types';

const generateSpotiesDefaultSettings = (type: SpotiesFieldType) => {
    let settings: SpotiesFieldSettings;

    switch (type) {
        case 'text':
            settings = {
                type: 'text',
                required: true,
                label: 'Text input',
                name: 'textInput'
            }
            break;
        case 'artist-name':
            settings = {
                type: 'artist-name',
                required: true,
                label: 'Artist input',
                name: 'Artist Name'
            }
            break;
        case 'record-name':
            settings = {
                type: 'record-name',
                required: true,
                label: 'Record input',
                name: 'Record Name'
            }
            break;
        case 'search':
            settings = {
                type: 'search',
                required: true,
                name: 'search'
            }
            break;
        case 'cover-image':
            settings = {
                type: 'cover-image',
                name: 'Cover Image'
            }
            break;
        default:
            settings = null;
    }
    return settings;
}

export { generateSpotiesDefaultSettings };
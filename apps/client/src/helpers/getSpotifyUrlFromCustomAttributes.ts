import { spotifyUrlFromUri } from '@shared/helpers'
import type { CustomAttribute } from '@types';

const getSpotifyUrlFromCustomAttributes = (attributes: CustomAttribute[]) => {
    const spotifyUriAttribute = attributes.find((attribute) => attribute.key === '_Spotify URI');
    return spotifyUriAttribute ? spotifyUrlFromUri(spotifyUriAttribute.value) : null;
}

export default getSpotifyUrlFromCustomAttributes;
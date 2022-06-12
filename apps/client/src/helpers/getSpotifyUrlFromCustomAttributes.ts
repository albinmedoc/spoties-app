import { spotifyUrlFromUri } from '@shared/helpers'

const getSpotifyUrlFromCustomAttributes = (attributes: { key: string; value?: string; }[]) => {
    const spotifyUriAttribute = attributes.find((attribute) => attribute.key === '_Spotify URI');
    return spotifyUriAttribute ? spotifyUrlFromUri(spotifyUriAttribute.value) : null;
}

export default getSpotifyUrlFromCustomAttributes;
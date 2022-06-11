export default (spotifyUri: string) => {
    // Ex: spotify:track:28QGhVCx80IcpEb1Gswdk0
    const [_, type, id] = spotifyUri.split(':');
    return `https://www.open.spotify.com/${type}/${id}`;
};
let mapArtistName = spotifyArtistArray => {
  return spotifyArtistArray.reduce((acc,curr,idx) => {
    return acc.length === 0 ? curr.name : `${acc} and ${curr.name}`;
  }, '');
};

let trackInfo = spotifyPlayData => {
  let artistName = mapArtistName(spotifyPlayData.item.artists);
  return {
    album: spotifyPlayData.item.album.name,
    name: spotifyPlayData.item.name,
    artist: artistName
  }
};

module.exports = { trackInfo };

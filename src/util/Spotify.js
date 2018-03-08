const client_id = 'client_id';
const redirect_uri = 'http://localhost:3000/';
let accessToken;

let Spotify = {
  getAccessToken() {

    if (accessToken) {
      return accessToken
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {

        accessToken = accessTokenMatch[1]
        const expiresIn = Number(expiresInMatch[1]);

        window.setTimeout(() => accessToken = '', expiresIn*1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;

    } else {
        let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location = url;
      }
  },

  search(term){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
    if(jsonResponse.tracks){
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
    });
  },
  savePlaylist(playlistName, trackURIs) {
  if (!playlistName && !trackURIs) {
    return;
  }
  const playlistAccessToken = Spotify.getAccessToken();
  const headers = {
    Authorization: `Bearer ${playlistAccessToken}`
  }
  let userId;
  let playlistID;

  return fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request Failed!');
    } )
    .then(jsonResponse => {
      if (jsonResponse) {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            name: playlistName
          })
        })
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .then(jsonResponse => {
      playlistID = jsonResponse.id;
      return fetch(`https://api.spotify.com//v1/users/${userId}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: trackURIs
        })
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }).then(jsonResponse => {
      return playlistID = jsonResponse.id;
    })
    .catch(err => console.error(err))
}
};

  export default Spotify;

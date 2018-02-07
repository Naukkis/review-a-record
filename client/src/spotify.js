import { store } from './store';
const axios = require('axios');

export function getAccessToken() {
  axios.get('/spotify/access-token')
        .then(function (res) {
          localStorage.setItem("spotifytoken", res.data.access_token);
        })
        .catch(function(err) {
          console.log(err);
        })
}

export function searchArtist(search){
  let url = 'https://api.spotify.com/v1/search?q=' + search + '&type=Artist&market=FI';
  let token = localStorage.getItem("spotifytoken");
 
  axios.get(url,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(res) {
    console.log(res.data);
    store.dispatch({type: "LOAD_ARTIST", field: "artists", payload: res.data.artists });
  })
  .catch(function(err) {
    console.log(err);
  })
}

export function searchAlbum(search){
  let url = 'https://api.spotify.com/v1/search?q=' + search + '&type=Album&market=FI';
  let token = localStorage.getItem("spotifytoken");

  axios.get(url,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(res) {
    console.log(res.data);
    store.dispatch({type: "LOAD_ALBUM", field: "albums", payload: res.data.albums });
  })
  .catch(function(err) {
    console.log(err);
  })
}

export function getArtistAlbums(spotifyid) {
  let url = `https://api.spotify.com/v1/artists/${spotifyid}/albums?album_type=album&market=FI`;
  let token = localStorage.getItem("spotifytoken");

  axios.get(url,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(res) {
    console.log(res.data);
    store.dispatch({type: "LOAD_ALBUM", field: "artistalbums", payload: res.data });
  })
  .catch(function(err) {
    console.log(err);
  })
}


export function getArtist(spotifyid) {
  let url = `https://api.spotify.com/v1/artists/${spotifyid}`;
  let token = localStorage.getItem("spotifytoken");
  axios.get(url,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(res) {
    console.log(res.data);
  })
  .catch(function(err) {
    console.log(err);
  })
}

export function getSeveralAlbums(spotifyids) {
  let url = `https://api.spotify.com/v1/albums/?ids=${spotifyids}`
  let token = localStorage.getItem("spotifytoken");
  axios.get(url,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then(function(res) {
    store.dispatch({type: "RECENT_REVIEWS", field: "recentreviews", payload: res.data });
  })
  .catch(function(err) {
    console.log(err);
  })
}
import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import TrackList from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playlistName: 'A string',
      playlistTracks: [],
      searchResults: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    
    
  }
  addTrack(track) {
    let countMatch = 0;
    this.state.playlistTracks.map(playlistTrack => {
      if(track.id === playlistTrack.id){
        countMatch ++;
      }
    });
    if(!countMatch){
         let currentTracks = this.state.playlistTracks;
         currentTracks.push(track);
         this.setState({playlistTracks: currentTracks});
       }
  }
  removeTrack(track){
    const newPlaylistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    console.log(newPlaylistTracks);
    this.setState({playlistTracks: newPlaylistTracks});
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(function(){
      this.setState({playlistName: 'New Playlist'},{searchResults: []})
    })

  }
  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResponse => {
      this.setState({searchResults: searchResponse});
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults  
              onAdd={this.addTrack} 
              searchResults={this.state.searchResults} 
            />
            <Playlist 
              isRemoval={true} 
              onRemove={this.removeTrack} 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e){
    const name = e.target.value;
    this.props.onNameChange(name);
  }
  
  render(){
    return(
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={this.props.playlistName}/>
        <TrackList isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>

    );
  }
}

export default Playlist;

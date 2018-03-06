import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render(){
    console.log(this.props.tracks);
    return (
      <div className="TrackList">
      {
        this.props.tracks.map(track => {
          return <Track isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} onAdd={this.props.onAdd} track={track} key={track.id}/>
        })
      }
      </div>
    );
  }
}

export default TrackList;

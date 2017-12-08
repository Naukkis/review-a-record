import React, { Component } from 'react';
import Reviews from './Reviews';

export default class AlbumDisplay extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      currentAlbum: this.props.match.params.id
    }
    this.openPlayer = this.openPlayer.bind(this);
  }

  openPlayer(currentAlbum) {
   window.open('http://localhost:3002/spotify/access/#current_album=' + this.state.currentAlbum, 'Spotify Player','width=400 height=350');
  }

  render(){
    return(
      <div id="headerwrap">
      <div id="album-display">
        {this.props.location.state.albumname &&
          <div>
            <img id="album-img" src={this.props.location.state.image} alt="album"/>
            <p>{this.props.location.state.albumname}</p>
            <p>by {this.props.location.state.artistname}</p>
            <a href="localhost:3002/spotify/auth" onClick={this.openPlayer}>Play album</a>

          </div>
        }
      </div>
        <Reviews state={this.props.location.state} />
      </div>

    );
  }
}

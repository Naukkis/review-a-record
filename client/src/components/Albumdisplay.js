import React, { Component } from 'react';
import Reviews from './Reviews';
import '../css/albumdisplay.css';


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
   window.open('http://localhost:3002/spotify/access/#current_album=' + this.state.currentAlbum, 'Spotify Player','width=400 height=500');
  }

  render(){
    return(
      <div className=" main-container container-fluid">
      	<div className="main-wrapper row">
					<div className="main-wrapper col-lg-3 ">
						<div className="main-wrapper row">
							<div className="component-wrapper col-lg-12">
								<div className="album-content">
                  {this.props.location.state.albumname &&
                    <div className="container-fluid">
                      <img className="albumdisplay-album-img" src={this.props.location.state.image} alt="album"/>
                    </div>
                  }
                  <div className="container-fluid">
                  <h2>{this.props.location.state.albumname}</h2>
                  </div>
                  <div className="container-fluid">
                  <h3>by {this.props.location.state.artistname}</h3>
                  </div>
                  <div className="play-wrapper container-fluid">
                  <button id="playbutton" href="localhost:3002/spotify/auth" onClick={this.openPlayer}>Play album</button>
                  </div>
                </div>
              </div>
  					</div>
  				</div>
          <Reviews />
        </div>
        <Reviews state={this.props.location.state} />
      </div>

    );
  }
}

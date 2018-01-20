import React, { Component } from 'react';
import Reviews from './Reviews';
import { store } from '../store.js'
import '../css/albumdisplay.css';


export default class AlbumDisplay extends Component {
  constructor(props) {
    super(props);
    this.handleClickTrue = this.handleClickTrue.bind(this);
    this.state = { currentAlbum: this.props.match.params.id };
    this.openPlayer = this.openPlayer.bind(this);
   }

  handleClickTrue() {
    store.dispatch({type: "CHANGE_REDIRECT", field: "redirectbutton", payload: "true"});
  }

  openPlayer(currentAlbum) {
    window.open('/spotify/access/#current_album=' + this.state.currentAlbum, 'Spotify Player','width=400 height=500');
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
                  <div className="button-wrapper container-fluid">
                    <button id="playbutton" href="/auth.html" onClick={this.openPlayer}>Play album</button>
                  </div>
                  <div className="button-wrapper container-fluid">
                  {
                    localStorage.getItem("token") ?
                      <button id="make-review-button" onClick={this.handleClickTrue}>Make review</button>:
                      <p>Login to make a review</p>
                  }
                  </div>
                </div>
              </div>
  					</div>
  				</div>
          <Reviews state={this.props.location.state} />
        </div>
      </div>

    );
  }
}

import React, { Component } from 'react';
import Reviews from './Reviews';

export default class AlbumDisplay extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render(){
    return(
      <div id="headerwrap">
      <div id="album-display">
        {this.props.location.state.albumname &&
          <div>
            <img id="album-img" src={this.props.location.state.image} />
            <p>{this.props.location.state.albumname}</p>
            <p>by {this.props.location.state.artistname}</p>
          </div>
        }
      </div>
        <Reviews state={this.props.location.state} />
      </div>

    );
  }
}

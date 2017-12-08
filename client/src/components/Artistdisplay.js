import React, { Component } from 'react';
import { getArtistAlbums } from '../spotify';
import { store } from '../store';
import { Link } from 'react-router-dom';

export default class Artistdisplay extends Component {
	constructor(props){
		super(props);
		this.state = {id: '', name: '', image: ''};
		getArtistAlbums(this.props.match.params.id)
	}

	componentDidMount() {
		this.setState({id: this.props.match.params.id, name: this.props.location.state.name});

	}


  render(){
    return (
			<div id="headerwrap">
      <div id="artist-display">
				{this.props.location.state.image.length > 0 &&
					<img id="artist-img" src={this.props.location.state.image[0].url} width="200" height="200" alt="gitgud"></img>
				}
				<p id="artist-data">{this.props.location.state.name}</p>
				<h4>Genres</h4>
				<div id="genres-artist">
				{this.props.location.state.genres.map(x =>
					<p id="artist-data-minor" key={x} className="artist-genres">{x}</p>
				)}
				</div>
      </div>
			<div>
			{ store.getState().artistalbums.items &&
			<div id="artistdisplay-albums">
				<ul id="artistdisplay-albums-info">
				<p id="artistdisplay-albums-header">Albums</p>
				{ store.getState().artistalbums.items.map((data) =>
					<Link to={{
						 pathname: `/album/${data.id}`,
						 state: {
							image: data.images[0].url,
 							artistname: data.artists[0].name,
 							artistid: data.artists[0].id,
 							albumname: data.name,
 							albumid: data.id
						 }
 				 	}} key={data.id}>
					{
						<li id="li-album" key={data.id}>

										 { data.images.length > 0 &&
											<div id="album-div">
												<img id="artist-album-img" src={data.images[0].url} alt={data.name} />
												<p id="artist-album-data">{data.name}</p>
											</div>
										 }

						</li>
					}
					</Link>

				)}
				</ul>
				</div>
			}
		</div>
		</div>


    );
  }
}

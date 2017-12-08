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
			<div>
      <div id="artist-display">
				{this.props.location.state.image.length > 0 &&
					<img src={this.props.location.state.image[0].url} width="200" height="200" alt="gitgud"></img>
				}
				<p>{this.props.location.state.name}</p>
				{this.props.location.state.genres.map(x =>
					<p key={x} className="artist-genres">{x}</p>
				)}
      </div>
			<div>
			{ store.getState().artistalbums.items &&
			<div id="albums">
				<h2>Albums</h2>
				<ul id="searchResults">
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
						<li key={data.id}>

										 { data.images.length > 0 &&
											<div>
												<img src={data.images[0].url} alt={data.name} />
												<p>{data.name}</p>
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

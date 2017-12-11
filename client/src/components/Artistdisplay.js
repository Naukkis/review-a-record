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
			<div id="main-wrapper col-lg-12">
      <div id="col-sm-3 col-md-6 col-lg-4">
				{this.props.location.state.image.length > 0 &&
					<img src={this.props.location.state.image[0].url} alt="artist"></img>
				}
				<p>{this.props.location.state.name}</p>
				<h4>Genres</h4>
				<div>
				{this.props.location.state.genres.map(x =>
					<p key={x} >{x}</p>
				)}
				</div>
      </div>
			<div>
			{ store.getState().artistalbums.items &&
			<div>
				<ul>
				<p>Albums</p>
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

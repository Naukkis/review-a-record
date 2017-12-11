import React, { Component } from 'react';
import { getArtistAlbums } from '../spotify';
import { store } from '../store';
import { Link } from 'react-router-dom';
import '../css/artistdisplay.css';

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
			<div className=" main-container container-fluid">
      	<div className="main-wrapper row">
					<div className="main-wrapper col-lg-3">
						<div className="main-wrapper row">
							<div className="component-wrapper col-lg-12">
								<div className="artist-content">
									{this.props.location.state.image.length > 0 &&
										<img className="artistdisplay-artist-img" src={this.props.location.state.image[0].url} alt="artist"></img>
									}
									<h2>{this.props.location.state.name}</h2>
										<div className="artist-genres-div">
										<h3>Genres</h3>
										{this.props.location.state.genres.map(x =>
											<p key={x} >{x}</p>
										)}
										</div>
      					</div>
							</div>
						</div>
					</div>
					<div className="component-wrapper col-lg-9">
						{ store.getState().artistalbums.items &&
						<div className="artist-content-albums">
							<h2>Albums</h2>
							<div className="ul-wrapper">
							<ul className="artist-content-albums-ul">
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
												<div className="artistdisplay-album-div">
													<img className="artistdisplay-album-img" src={data.images[0].url} alt={data.name} />
													<p>{data.name}</p>
												</div>
											}
											</li>
										}
								  </Link>
								)}
						  </ul>
							</div>
					  </div>
					  }
					</div>
				</div>
			</div>
    );
  }
}

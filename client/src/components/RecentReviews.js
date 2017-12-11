import React from 'react';
import axios from 'axios';
import { getSeveralAlbums } from '../spotify';
import { store } from '../store.js';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RecentReviews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: {},
			albumData: {}
		}
		this.getRecentReviews = this.getRecentReviews.bind(this);
		this.getAlbumIDs = this.getAlbumIDs.bind(this);
		this.getRecentReviews();
	}

	getRecentReviews() {
		axios.get('/reviews/latest')
			 .then((res) => {
			 	this.setState({reviews: res.data.data});
			 	let albumids = this.getAlbumIDs(res.data.data);
			 	getSeveralAlbums(albumids);
			 })
			 .catch((err) => {
			 	console.log(err);
			 })
	}

	getAlbumIDs(reviews) {
		let idset = new Set();
		let albumids = ''; 
		reviews.forEach(x => idset.add(x.spotify_album_id));
		idset.forEach(id => albumids += id + ',');
		return albumids.slice(0,albumids.length - 1);
	}

	render() {
		const date = (reviewDate) => {
		  let datetime = new Date(reviewDate);
		  let day = datetime.toLocaleDateString();
		  let time = datetime.toLocaleTimeString();
		  return day + " " + time;
		}

		const currentAlbum = (spotifyid) => {
			return store.getState().recentreviews.albums.filter(x =>
				x.id == spotifyid
			)
		}
		const reviews = this.state.reviews;

		const albumInfo = store.getState().recentreviews.albums;
		return (
			<div className="container-fluid">

			{reviews.length > 0 && albumInfo && (
				<Grid style={{marginTop: 150}}>	
				<h1 style={{color: "white", fontSize: 70}}>Latest album reviews</h1>			      
			            {
			              this.state.reviews.map(x =>
			              	<Row style={{borderStyle: "solid", borderColor: "white", maxHeight: 200, overflow: "hidden", padding: 20}} key={x.reviewid}>             	
				                <Col lg={2} sm={2}>
				                <Link to={{
				                	pathname: `/album/${x.spotify_album_id}`,
						 					state: {
												image: currentAlbum(x.spotify_album_id)[0].images[0].url,
 												artistname: currentAlbum(x.spotify_album_id)[0].artists[0].name,
 												artistid: currentAlbum(x.spotify_album_id)[0].artists[0].id,
 												albumname: currentAlbum(x.spotify_album_id)[0].name,
 												albumid: x.spotify_album_id
						 					}
				                }} key={x.spotify_album_id}>
				                	<img src={currentAlbum(x.spotify_album_id)[0].images[2].url} alt="404" />
				                	<p style={{color: "white" }}>{currentAlbum(x.spotify_album_id)[0].artists[0].name}</p>
					                <p style={{color: "white" }}>{currentAlbum(x.spotify_album_id)[0].name}</p>
					            </Link>
				                </Col>

				                 <Col lg={5} sm={5}>
				                  <p style={{color: "white" }}>{x.review_text}</p>  
				                    
				                </Col>
				                <Col lg={2} sm={2}>
				                <span style={{color: "white" }} className="time-right">{x.username} {date(x.date_time)}</span>
				                </Col>
				                
			                </Row>
			              )
			            }
          		</Grid>	)		
			}	
			</div>
		)
	}
}

export default RecentReviews;
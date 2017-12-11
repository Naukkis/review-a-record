import React from 'react';
import axios from 'axios';
import { getSeveralAlbums } from '../spotify';
import { store } from '../store.js';

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
		let albumids = ''; 
		reviews.map((x) => {
			albumids += x.spotify_album_id + ',';
		});
		return albumids.slice(0,albumids.length - 1);
	}

	render() {
		const date = (reviewDate) => {
		  let datetime = new Date(reviewDate);
		  let day = datetime.toLocaleDateString();
		  let time = datetime.toLocaleTimeString();
		  return day + " " + time;
		}

		const albumimage = (spotifyid) => {
			return store.getState().recentreviews.albums.filter(x =>
				x.id == spotifyid
			)
		}
		const reviews = this.state.reviews;
		return (
			<div>
			{reviews.length > 0 && store.getState().recentreviews.albums && (
				<div className="review-container">
				
			          <div id="revies">
			            {
			              this.state.reviews.map(x =>	              	
			                <div className="review" key={x.reviewid}>
			                <img src={albumimage(x.spotify_album_id)[0].images[2].url} alt="404" />
			                  <p style={{color: "white" }}>{x.review_text}</p>
			                  <span className="time-right">{x.username} {date(x.date_time)}</span>
			                </div>
			              )
			            }

          			</div>
          		</div>	)		
			}	
			</div>
		)
	}
}

export default RecentReviews;
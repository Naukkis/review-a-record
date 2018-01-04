import React from 'react';
import { store } from '../store.js';
import { Link } from 'react-router-dom';
import '../css/searchresults.css';

class SearchResults extends React.Component {

	render() {
		return (
			<div className="main-searchresults-wrapper">
				{ store.getState().artists.items &&
					<div className="searchresults-artist-wrapper container-fluid">
						<h1>Artists</h1>
						<ul className="searchresult-container container-fluid">
							{ store.getState().artists.items.map((data) =>
							<Link to={{
						 		pathname: `/artist/${data.id}`,
						 		state: {
							 		name: data.name,
							 		image: data.images,
							 		genres: data.genres
						 	}
 				 			}} key={data.id}>{
									<li className="searchresult-container-elements row" key={data.id}>
									{ data.images.length > 0 &&
										<div>
											<img className="searchresults-artist-img" src={data.images[0].url} alt={data.name} />
											<p>{data.name}</p>
										</div>
									}
									{
										data.images.length === 0 &&
										<div>
											<img className="searchresults-artist-img" src={'/img/question-mark.jpg'} alt="404"/>
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
				{ store.getState().albums.items &&
					<div className="searchresults-artist-wrapper container-fluid">
						<h1>Albums</h1>
						 <ul className="searchresult-container container-fluid">
							{ store.getState().albums.items.map((data) =>
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
									<li className="searchresult-container-elements row" key={data.id}>
										{ data.images.length > 0 &&
		 									<div>
			 									<img className="searchresults-album-img" src={data.images[0].url} alt={data.name} />
												<p >{data.name}</p>
		 									</div>
		               	}
										{
		 									data.images.length === 0 &&
		 									<div>
		 										<img className="searchresults-album-img" src={'/img/question-mark.jpg'}  alt="404"/>
		 										<p>{data.name}</p>
		 									</div>
		 								}
									</li>
							</Link>
							)}
						</ul>
					</div>
			}
			</div>
		);
	}
}

export default SearchResults;

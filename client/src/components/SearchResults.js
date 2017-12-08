import React from 'react';
import { store } from '../store.js';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {

	render() {
		return (
			<div className="artist-binder">
			{ store.getState().artists.items &&
			<div id="artist">
			<h1 id="search-info-text-header">Artists</h1>
				<ul id="searchResults">
				{ store.getState().artists.items.map((data) =>
					<Link to={{
						 pathname: `/artist/${data.id}`,
						 state: {
							 name: data.name,
							 image: data.images,
							 genres: data.genres
						 }
 				 	}} key={data.id}>{
						<li id="li" key={data.id}>
							{
								data.images.length > 0 &&
								<div id="spacing-info">
								<img id="artist-img" src={data.images[0].url} alt={data.name} />
								<p id="search-info-text">{data.name}</p>
								</div>
							}
							{
								data.images.length === 0 &&
								<div id="spacing-info">
									<img id="artist-img" src={'../img/question-mark.jpg'} alt="404"/>
									<p id="search-info-text">{data.name}</p>
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
			<div id="albums">
				<h1  id="search-info-text-header">Albums</h1>
				<ul id="searchResults">
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
					<li id="li" key={data.id}>

		               { data.images.length > 0 &&
		 								<div id="spacing-info">
			 								<img id="album-img" src={data.images[0].url} alt={data.name} />
											<p  id="search-info-text">{data.name}</p>
		 								</div>
		               }
									 {
		 								data.images.length === 0 &&
		 								<div id="spacing-info">
		 									<img id="album-img" src={'../img/question-mark.jpg'}  alt="404"/>
		 									<p id="search-info-text">{data.name}</p>
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

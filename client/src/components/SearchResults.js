import React from 'react';
import { store } from '../store.js';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {

	render() {
		return (
			<div>
			{ store.getState().artists.items &&
			<div id="artist">
				<ul id="searchResults">
				{ store.getState().artists.items.map((data) =>
					<li key={data.id}>
<<<<<<< HEAD
		               <p>{data.name}</p>
		               { data.images.length > 0 &&
=======
		               <Link to={{
											pathname: `/artist/${data.id}`,
											state: {
												name: data.name,
												image: data.images
											}
					}}>{data.name}</Link>
		               { data.images.length > 0 && 
>>>>>>> d93ab9bf2350c052ee27218a12918151a33a19db
		              	<img src={data.images[0].url} alt={data.name} />
		               }
		            </li>
				)}
				</ul>
			</div>
			}
			{ store.getState().albums.items &&
			<div id="albums">
				<h2>Albums</h2>
				<ul id="searchResults">
				{ store.getState().albums.items.map((data) =>
					<li key={data.id}>
		               <p>{data.name}</p>
		               { data.images.length > 0 &&
		              	<img src={data.images[0].url} alt={data.name} />
		               }
		            </li>
				)}
				</ul>
			</div>
			}

			</div>
		);
	}
}

export default SearchResults;

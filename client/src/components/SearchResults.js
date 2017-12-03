import React from 'react';
import { store } from '../store.js';

class SearchResults extends React.Component {

	render() {
		return (
			<div>	
			{ store.getState().artists.items && 	
			<div>	
				<h2>Artists</h2>
				<ul id="searchResults">
				{ store.getState().artists.items.map((data) =>
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
			{ store.getState().albums.items &&
			<div>
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
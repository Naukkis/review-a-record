import React from 'react';
import { store } from '../store.js';

class SearchResults extends React.Component {

	render() {
		return (
			<div>
			{ store.getState().artists.items && 


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
				}
			</div>
		);
	}
}

export default SearchResults;
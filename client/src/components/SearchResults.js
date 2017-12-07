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
					<Link to={{
						 pathname: `/artist/${data.id}`,
						 state: {
							 name: data.name,
							 image: data.images
						 }
 				 	}}>{
						<li key={data.id}>
							{
								data.images.length > 0 &&
								<div>
								<img src={data.images[0].url} alt={data.name} />
								<p>{data.name}</p>
								</div>
							}
							{
								data.images.length == 0 &&
								<div>
									<img src={'../img/question-mark.jpg'} />
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
			<div id="albums">
				<h2>Albums</h2>
				<ul id="searchResults">
				{ store.getState().albums.items.map((data) =>
					<li key={data.id}>

		               { data.images.length > 0 &&
		 								<div>
			 								<img src={data.images[0].url} alt={data.name} />
											<p>{data.name}</p>
		 								</div>
		               }
									 {
		 								data.images.length == 0 &&
		 								<div>
		 									<img src={'../img/question-mark.jpg'} />
		 									<p>{data.name}</p>
		 								</div>
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

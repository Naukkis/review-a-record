import React, { Component } from 'react';
import Makereview from "./Makereview";
import { store } from '../store.js';
import axios from 'axios';
import '../css/reviews.css';


export default class Reviews extends Component {

  constructor(props){
    super(props);
    store.dispatch((dispatch) => {
      axios.get('/reviews/album/' + this.props.state.albumid)
      .then((res) => {
        dispatch({type: "LOAD_REVIEWS", field: "reviews", payload: res.data});
      })
    })
  }

  render(){
    const date = (reviewDate) => {
      let datetime = new Date(reviewDate);
      let day = datetime.toLocaleDateString();
      let time = datetime.toLocaleTimeString();
      return day + " " + time;
    }

    console.log(store.getState().writereview);
    if(store.getState().redirectbutton === "false" ) {
      return (
        <div className="component-wrapper col-lg-offset-3">
          <div className="artist-content-albums">
          {
            store.getState().reviews.data && store.getState().reviews.data[0].spotify_album_id === this.props.state.albumid &&
            <div className="reviews-div">
              {
                store.getState().reviews.data.map(x =>
                  <div className="user-review" key={x.reviewid}>
                    <p>{x.review_text}</p>
                    <span className="user">{x.username} {date(x.date_time)}</span>
                  </div>
                )
              }
            </div>

          }

          </div>


        </div>
      );
    } else {

    }
    return (
      <div className="component-wrapper col-lg-offset-3">
        <Makereview state={this.props.state}/>
      </div>
    );
  }
}

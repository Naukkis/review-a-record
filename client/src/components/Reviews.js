import React, { Component } from 'react';
import Makereview from "./Makereview";
import { store } from '../store.js';
import axios from 'axios';



export default class Reviews extends Component {

  constructor(props){
    super(props);
    this.handleClickTrue = this.handleClickTrue.bind(this);
    store.dispatch((dispatch) => {
      axios.get('/reviews/album/' + this.props.state.albumid)
      .then((res) => {
        dispatch({type: "LOAD_REVIEWS", field: "reviews", payload: res.data});
      })
    })
  }


  handleClickTrue() {
    store.dispatch({type: "CHANGE_REDIRECT", field: "redirectbutton", payload: "true"});
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
        <div>
          <div className="review-container">
          {
            store.getState().reviews.data && store.getState().reviews.data[0].spotify_album_id === this.props.state.albumid &&
            <div id="revies">
              {
                store.getState().reviews.data.map(x =>
                  <div className="review" key={x.reviewid}>
                    <p style={{color: "white" }}>{x.review_text}</p>
                    <span className="time-right">{x.username} {date(x.date_time)}</span>
                  </div>
                )
              }
            </div>

          }

          </div>

          <button onClick={this.handleClickTrue}>Make review</button>
        </div>
      );
    } else {

    }
    return (
      <div>
        <Makereview state={this.props.state}/>
      </div>
    );
  }
}

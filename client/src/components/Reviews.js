import React, { Component } from 'react';
import Makereview from "./Makereview";
import { store } from '../store.js';
import axios from 'axios';



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
    console.log(store.getState().writereview);
    return (
      <div id="headerwrap">
        <div className="review-container">
        {
          store.getState().reviews.data &&
          <div id="revies">
            {
              store.getState().reviews.data.map(x =>
                <div className="review" key={x.name}>
                  <p style={{color: "white" }}>{x.review_text}</p>
                  <span className="time-right">{x.date_time}</span>
                </div>
              )
            }
          </div>

        }

        </div>
        <Makereview state={this.props.state}/>
      </div>
    );
  }
}

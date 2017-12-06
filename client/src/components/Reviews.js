import React, { Component } from 'react';

export default class Reviews extends Component {


  render(){
      const mock = [{
        name: "diudiudiu",
        time: "12:00"
      },
      {
        name: "diudiudiu2",
        time: "12:00"
      },
      {
        name: "diudiudiu2",
        time: "12:00"
      },
      {
        name: "diudiudiu2",
        time: "12:00"
      },
      {
        name: "diudiudiu2",
        time: "12:00"
      },
      {
        name: "diudiudiu2",
        time: "12:00"
      },
      {
        name: "diudiudiu3",
        time: "12:00"
      }]
    return (
      <div id="headerwrap">
        <div className="review-container">

        {mock.map((x) =>
          <div className="review" key={x.name}>
            <p style={{color: "white" }}>{x.name}</p>
            <span className="time-right">{x.time}</span>
          </div>
        )}
        </div>
      </div>
    );
  }
}

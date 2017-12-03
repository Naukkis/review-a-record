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
        name: "diudiudiu3",
        time: "12:00"
      }]
    return (
      <div>


        {mock.map((x) =>
          <div className="container" key={x.name}>
            <p>{x.name}</p>
            <span className="time-right">{x.time}</span>
          </div>
        )}
      </div>
    );
  }
}

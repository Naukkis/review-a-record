import React, { Component } from 'react';

export default class Reviews extends Component {

  constructor(props){
    super(props);
    this.state = {name: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.value = '';
    this.setState({ name: ''});
  }

  render(){
      const mock = [{
        name: "diudiudiu",
        review: "piupiupiupiu",
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
            <p style={{color: "white" }}>{x.review}</p>
            <span className="time-right">{x.time}</span>
          </div>
        )}
        <div>
        <form className="search" onSubmit={this.handleSubmit}>
				<input type="text" id="searchbox" placeholder="Search..." name={this.state.value}
						onChange={this.handleChange} onSubmit={this.handleSubmit}>
				</input>
				</form>
        </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Makereview from "./Makereview";

export default class Reviews extends Component {

  constructor(props){
    super(props);
    this.state = {name: "", review: ""};
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    e.target.name = '';
    e.target.review = '';
    this.setState({ name: '', review: ''});
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
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
      <div>
        <div className="review-container">

        {mock.map((x) =>
          <div className="review" key={x.name}>
            <p style={{color: "white" }}>{x.name}</p>
            <p style={{color: "white" }}>{x.review}</p>
            <span className="time-right">{x.time}</span>
          </div>
        )}
        </div>
        <Makereview />
      </div>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';

export default class Reviews extends Component {

  constructor(props){
    super(props);
    this.state = {review: " "};
    //this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

//  onSubmit(e) {
//    e.preventDefault();
//
//  axios.post(' ',{
//      review: this.state.review}
//  )

  render(){
    return (
      <div className="user-review-container">
        <form id="review-form" onSubmit={this.onSubmit}>
          <textarea id="comment-area" rows="4" cols="50" name="comment" value={this.state.review}
            onChange={this.handleChange} onSubmit={this.handleSubmit}>
          </textarea>
          <div>
            <input type="submit" value="Submit"/>
          </div>
      </form>

</div>
    );
  }
}

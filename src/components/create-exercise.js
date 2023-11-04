import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import axios from 'axios';
//align to import the styling for that date picker
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    // we're binding "this" to each of these methods.
    // so "this" will be referring to right thing.
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  // it is called before any code in this file is loaded into browser..
  componentDidMount() {
    // sets the first user as if we don't connected to database
    // to test this as it selects this  in the form..
    // this.setState({
    //   users: ['test user'],
    //   username: "test user",
      // });
      
      axios.get('http://localhost:5000/users/')
          .then(res => {
              if (res.data.length > 0) {
                  this.setState({
                      users: res.data.map(user => user),
                   username: res.data[0].username   
              })
          }
      })
  }

  onChangeUsername(e) {
    this.setState({
      // target is the text box and value is the value of the text box
      username: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      // target is the text box and value is the value of the text box
      description: e.target.value
    });
  }
  onChangeDuration(e) {
    this.setState({
      // target is the text box and value is the value of the text box
      duration: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      // target is the text box and value is the value of the text box
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios.post("http://localhost:5000/exercises/add", exercise)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
    
    // take the person back to home page;
    window.location = '/';
    console.log(exercise);
    

  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="from-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(
                  function (user) {
                        // returns a option in select box
                        
                      return (
                        <option
                            key={user._id}
                            value={user.username}>
                              {user.username}
                          </option>);
                    
                  }
                )
              }
            </select>
                </div>
                <div className="form-group">
                    <label >Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    
                    />

                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label >Date: </label>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
        </form>
      </div>
    );
  }
}

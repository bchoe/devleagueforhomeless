import React from "react";
import ReactDOM from "react-dom";

const MainContainer = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render: function () {
    return (
      <div className="mainContainer">
        <h1>Report Camp!!</h1>
        <br />
        <form className="form">
          <div className="location">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              placeholder="1234 Street Name, City, State, Zipcode"
            />
          </div>
          <div className="email">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="location"
              placeholder="yourname@example.com"
            />
          </div>
          <div className="phone">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="location"
              placeholder="(###) ###-####"
            />
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Please write a detailed description of what you see."
            ></textarea>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <br />
        <p className="mahalo"> Mahalo for helping your community!</p>
      </div>
    );
  }
});

ReactDOM.render(
  <MainContainer url = "/" pollInterval = {2000}/>,
  document.getElementById('app')
);
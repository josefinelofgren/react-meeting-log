// import libaries
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './Firebase';

// import components
import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Meetings from './components/Meetings';
import Navigation from './components/Navigation';
import CheckIn from './components/CheckIn';
import Attendees from './components/Attendees';


class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };

  }

  componentDidMount() {
    firebase
    .auth()
    .onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const meetingsRef = firebase
        .database()
        .ref('meetings/' + FBUser.uid);

        meetingsRef.on('value', snapshot => {

          let meetings = snapshot.val();
          let meetingsList = [];

          for(let item in meetings){
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });

        })

      } else {
        this.setState({ user: null });
      }
    });
  }

  // register user
  registerUser = userName => {
    firebase
    .auth()
    .onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/meetings');
      });
    })
  };


  // logout user 
  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase
    .auth()
    .signOut()
    .then(() => {
      navigate('/login');
    });
  };

  // add meeting
  addMeeting = meetingName => {
    const ref = firebase
    .database()
    .ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} /> 
        {this.state.user && <Welcome userName={this.state.displayName} logOutUser={this.logOutUser}/> }
            <Router>
                <Login 
                  path="/login"
                  /> 
                <Register 
                  path="/register"
                  registerUser={this.registerUser} 
                  /> 
                <Meetings 
                  path="/meetings"
                  addMeeting={this.addMeeting} 
                  meetings={this.state.meetings}
                  userID={this.state.userID}
                  /> 
                <CheckIn 
                  path="/checkin/:userID/:meetingID"
                  /> 
                <Attendees 
                  path="/attendees/:userID/:meetingID"
                  adminUser={this.state.userID}
                />
                <Home 
                  path="/"
                  user={this.state.user} 
                  /> 
            </Router> 
      </div>
    );
  }
}

export default App;

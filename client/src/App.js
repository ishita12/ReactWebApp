import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import * as actions from './actions/authActions';
import * as pactions from './actions/profileActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import NotFound from './components/not-found/NotFound';
import Login from './components/auth/Login';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import Private from './components/commons/Private';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/Edit-Profile';
import AddEducation from './components/add-credentials/add-education';
import PostShifts from './components/PostShifts/PostShifts';
import PostShiftItem from './components/PostShifts/PostShiftItem';
import ViewShifts from './components/PostShifts/ViewShifts';
import ViewShift from './components/PostShifts/ViewShift';
import EditPostedShift from './components/PostShifts/EditPostedShift';
import ViewPostedShifts from './components/ProctorShifts/ViewPostedShifts';
import IndividualShiftClaim from './components/ProctorShifts/IndividualShiftClaim';
import IndividualShift from './components/Schedule/IndividualShift';
import MySchedule from './components/Schedule/MySchedule';

// check for token

if(localStorage.jwtToken) {
  // Set auth token header auth

  setAuthToken(localStorage.jwtToken);
  // decode token and get user information and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set the current user
  store.dispatch(actions.setCurrentUser(decoded));

  // check for expired token

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(actions.logout());
    // clear current profile
    store.dispatch(pactions.clearCurrentProfile());
    window.location.href = '/login';
  }

  // redirect to login
  //

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <Private exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/edit-postedShift"
                  component={EditPostedShift}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/not-found"
                  component={NotFound}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/individualShiftClaim"
                  component={IndividualShiftClaim}
                  />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/individualShift"
                  component={IndividualShift}
                  />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/profiles"
                  component={Profiles}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/profile/:handle"
                  component={Profile}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/postShifts"
                  component={PostShifts}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/postShiftItem"
                  component={PostShiftItem}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/viewShifts"
                  component={ViewShifts}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/viewPostedShifts"
                  component={ViewPostedShifts}
                />
              </Switch>
              <Switch>
                <Private
                  exact
                  path="/mySchedule"
                  component={MySchedule}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

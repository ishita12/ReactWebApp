import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import * as actions from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// check for token

if(localStorage.jwtToken) {
  // Set auth token header auth

  setAuthToken(localStorage.jwtToken);
  // decode token and get user information and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set the current user
  store.dispatch(actions.setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
      <div className="App">
      <Navbar />

      <Route exact path="/" component={ Landing } />
      <div class="container">

       <Route path="/register" component={ Register } />

         <Route path="/login" component={ Login } />

      </div>
      <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;

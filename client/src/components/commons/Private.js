import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const Private = ({component: Component, auth, ...rest}) => (

  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);



Private.propTypes = {

auth: PropTypes.object.isRequired

}


const mapStateToProps = (state) => {
  return {
  auth: state.auth
  }
}

export default connect(mapStateToProps)(Private);

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div>
<h4>Page not found</h4>
<Link to="/profiles" className="btn btn-warning mb-3 float-left">
Back to profiles
</Link>
    </div>
  )
}

export default NotFound;

import React from 'react'
import PropTypes from 'prop-types'
import PostShifts from '../PostShifts/PostShifts';
import ViewShifts from '../PostShifts/ViewShifts';
import { Link } from 'react-router-dom';

const ShiftOptions = (props) => {
  return (
    <div className="btn-group mb-4" role="group">
            <Link to="/profiles" className="btn btn-light">
                 View Proctor profiles
                   <i className="fas fa-user-circle text-info mr-1"></i>
                  </Link>
              <Link to="/postShifts" component={PostShifts} className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1"></i>Post Shifts Here</Link>
              <Link to="/viewShifts"  component={ViewShifts} className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1"></i>
                View Shifts
                </Link>
          </div>
  )
}

export default ShiftOptions;

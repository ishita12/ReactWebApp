import React from 'react'
import PropTypes from 'prop-types'
import PostShifts from '../PostShifts/PostShifts';
import ViewShifts from '../PostShifts/ViewShifts';
import ViewPostedShifts from '../ProctorShifts/ViewPostedShifts';
import MySchedule from '../Schedule/MySchedule';
import ApplyShiftsFilters from '../applyShiftsFilters/ApplyShiftsFilters';
import { Link } from 'react-router-dom';

const ProctorShiftOptions = (props) => {
  return (
    <div className="btn-group mb-4" role="group">
    <Link to="/profiles" className="btn btn-light">
         View Proctor profiles
           <i className="fas fa-user-circle text-info mr-1"></i>
          </Link>
        <Link to="/viewPostedShifts" component={ViewPostedShifts} className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"></i> View Posted Shifts</Link>

        <Link to="/mySchedule"  component={MySchedule} className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1"></i>
          My Schedule
          </Link>
          <Link to="/viewPostedShifts"  component={ViewPostedShifts} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1"></i>
          View Dropped Shifts
            </Link>
            <Link to="/applyShiftsFilters"  component={ApplyShiftsFilters} className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"></i>
            Apply Shifts Filters
              </Link>


          </div>
  )
}

export default ProctorShiftOptions;

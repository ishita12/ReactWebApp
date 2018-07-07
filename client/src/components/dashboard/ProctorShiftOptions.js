import React from 'react'
import PropTypes from 'prop-types'
import PostShifts from '../PostShifts/PostShifts';
import ViewShifts from '../PostShifts/ViewShifts';
import ViewPostedShifts from '../ProctorShifts/ViewPostedShifts';
import MySchedule from '../Schedule/MySchedule';
import ApplyShiftsFilters from '../applyShiftsFilters/ApplyShiftsFilters';
import MyMessages from '../myMessages/MyMessages';
import MapContainer from '../mapComponent/MapContainer';
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
          <Link to="/myMessages"  component={MyMessages} className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1"></i>
        My Messages
            </Link>
            <Link to="/mymap"  component={MapContainer} className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"></i>
            View on map
              </Link>


          </div>
  )
}

export default ProctorShiftOptions;

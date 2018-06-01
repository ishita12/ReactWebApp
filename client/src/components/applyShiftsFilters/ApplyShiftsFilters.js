import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../commons/TextFielddGroup';
import SelectListGroup from '../commons/SelectListGroup';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class ApplyShiftsFilters extends Component {
  constructor(props) {
      super(props);
      this.state = {

        hall: '',
        shiftType: '',
        errors: {},
        show: false
      };

      this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }


toggle(e) {
  const val= this.state.show;
  this.setState({show: !val});
  console.log('the value of show is     '+this.state.show);
}
    onSubmit(e) {
      e.preventDefault();


      const shift = {

      user: this.state.user,
      sid: this.state.sid,
      shiftDate: this.state.shiftDate,
      hall: this.state.hall,
      shiftType: this.state.shiftType,
      timeIn: this.state.timeIn,
      timeOut: this.state.timeOut,
      hours: this.state.hours

      }

















    }

  render () {
let showForm = null;
    const shiftTypeOptions = [
          {label: 'all types', value: 'all types'},
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C1', value: 'C1' },
          { label: 'C2', value: 'C2' },
          { label: 'D', value: 'D' }
        ];

        const shiftHallOptions =    [{label: 'all stations', value: 'all stations'},
                      {label: '337 Huntington', value: '337 Huntington'},
                       {label: 'Northwest', value: 'Northwest'},
                       {label: 'Melvin Hall', value: 'Melvin Hall'},
                       {label: 'Kerr Hall', value: 'Kerr Hall'},
                       {label: 'Light Hall', value: 'Light Hall'},
                       {label: 'Rubenstein Hall', value: 'Rubenstein Hall'},
                       {label: 'Burstein Hall', value: 'Burstein Hall'},
                       {label: 'Stetson Hall', value: 'Stetson Hall'}
                     ];

                     if(this.state.show) {

showForm = (

<div>
  <h2>Station:</h2><SelectListGroup
                   placeholder="Hall"
                   name="hall"
                   value={this.state.hall}
                   onChange={this.onChange}
                   options={shiftHallOptions}
                 />
  <h2>Shift Type</h2>               <SelectListGroup
                                  placeholder="shiftType"
                                  name="shiftType"
                                  value={this.state.shiftType}
                                  onChange={this.onChange}
                                  options={shiftTypeOptions}
                                />
    <input type="submit" value="Apply changes"  className="btn btn-info btn-block mt-4"    />
</div>
);

                     }
  return (

<div className="aaply-shifts-filters">
<button type="button" onClick={this.toggle}>Apply Shifts Filters</button>

<form onSubmit={this.onSubmit}>

{showForm}


</form>

<hr />


<Link to="/dashboard" className="btn btn-light">

Go Back
</Link>


</div>
  )

  }
}

export default ApplyShiftsFilters;

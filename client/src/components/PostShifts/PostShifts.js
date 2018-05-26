import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '../commons/Input';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostShiftItem from './PostShiftItem';
class PostShifts extends Component {

constructor(props) {
  super(props);
  this.state = {
    shiftDate: '',
    redirect: false
  };
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}




onSubmit(e) {

  e.preventDefault();

  const dd = new Date(this.state.shiftDate).toISOString();

const today = Date.now();
if(dd <= today) {

this.props.history.push('/postShifts');
console.log('line 28   '+dd);
}
else {
let out=null;
  console.log('line 37   '+this.state.shiftDate);

this.setState({shiftDate: dd, redirect: true});



  console.log('line 32   ');
}

}

onChange(e) {
  this.setState({[e.target.name]: e.target.value});

}

  render () {
    const { redirect } = this.state;

if(redirect) {
  return (

    <Redirect to={{
                  pathname: '/postShiftItem',
                  state: { referrer: this.state.shiftDate }
              }} />
  )
}
    const { errors } = this.state;
return (
<div className="PostShifts">
<h1>Post Shifts here </h1>
<h3>Select date </h3>

<form onSubmit={this.onSubmit}>
<Input

name="shiftDate"
type="date"
value={this.state.shiftDate}
onChange={this.onChange}

/>

<input type="submit" className="btn btn-info btn-block mt-4" />
</form>
<Link to="/dashboard" className="btn btn-warning btn-block mt-4">
Back
</Link>
</div>

);
  }
}


const mapStateToProps = (state) => {
  return {
  profile: state.profile,
  errors: state.errReducer
  }
}
export default connect(mapStateToProps)(PostShifts);

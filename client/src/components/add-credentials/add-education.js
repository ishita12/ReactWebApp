import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import  Input  from '../commons/Input';
import SelectField from '../commons/Select';
import * as eduActions from '../../actions/profileActions';

class  AddEducation extends Component {

constructor(props) {
  super(props);
  this.state = {

  school: '',
  degree: '',
  fieldofstudy: '',
  from: '',
  to: '',
  current: '',
  errors: {},
  disabled: false



};
this.onChange = this.onChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.onCheck = this.onCheck.bind(this);
}

componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
  }
}


onSubmit(e) {
  e.preventDefault();
const eduData = {
  school: this.state.school,
  degree: this.state.degree,
  fieldofstudy: this.state.fieldofstudy,
  from: this.state.from,
  to: this.state.to,
  current: this.state.current
};
console.log('line 49   '+eduData.school);
this.props.addEducation(eduData, this.props.history);

}
onChange(e) {
  this.setState({[e.target.name]: e.target.value});
}
onCheck(e) {
this.setState({
disabled: !this.state.disabled,
current: !this.state.current


});
}


  render () {

const { errors } = this.state;
return (

<div className="add-education">
<div className="container">
<div className="col-md-8 m-auto">
<Link to="/dashboard" className="btn btn-light">

Go Back
</Link>
<h1 className="display-4 text-center"> Add Education</h1>
<p className="lead text-center">Add Education</p>
<small className="d-block pb-3">* = required fields</small>
<form onSubmit={this.onSubmit}>
<Input
placeholder="school"
name="school"
value={this.state.school}
onChange={this.onChange}
error={errors.school}
/>

<Input
placeholder="degree"
name="degree"
value={this.state.degree}
onChange={this.onChange}
error={errors.degree}

/>
<Input
placeholder="fieldofstudy"
name="fieldofstudy"
value={this.state.fieldofstudy}
onChange={this.onChange}
error={errors.fieldofstudy}

/>
<h6>From </h6>
<Input

name="from"
type="date"
value={this.state.from}
onChange={this.onChange}
error={errors.from}


/>

<h6>To </h6>
<Input

name="to"
value={this.state.to}
onChange={this.onChange}
error={errors.to}
type="date"
disabled={this.state.disabled ? 'disabled' : ''}
/>
<label htmlFor="current" className="form-check-label">
Curent
</label>
<Input
type="checkbox"
className="form-check-input"
name="current"
value={this.state.current}
checked={this.state.current}
onChange={this.onCheck}
id="current"
/>
<input type="submit" className="btn btn-info btn-block mt-4" />

</form>
</div>
</div>
</div>

)

  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
  profile: state.profile,
  errors: state.errReducer
  }
}
const mapDispatchToProps = dispatch => {

return {
  addEducation:  (eduData, history) => dispatch(eduActions.addEducation(eduData, history))
}

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import * as eduActions from '../../actions/profileActions';
class Education extends Component {


  deleteEducation(id) {
    this.props.deleteEducation(id);
  }
  render () {

const education = this.props.education.map(edu => (
<tr key={edu.id}>
<td>{edu.school}</td>
<td>{edu.degree}</td>
<td>{edu.fieldofstudy}</td>
<td>
<Moment format="YYYY/MM/DD">{edu.from}</Moment> -
{edu.to === null ? (' present') : ( <Moment format="YYYY/MM/DD">{edu.to}</Moment> )}
</td>
<td><button onClick={this.deleteEducation.bind(this, edu.id)} className="btn btn-danger">Delete</button></td>
</tr>

));

return (
<div>
<h4 className="mb-4">Education information</h4>
<table className="table">
<thead>
<tr>
<th>School</th>
<th>Degree</th>
<th>Field of Study</th>
<th>Years</th>
<th></th>
</tr>

{education}

</thead>
</table>
</div>
);



  }
}


const mapDispatchToProps = dispatch => {

return {
deleteEducation:  (edu) => dispatch(eduActions.deleteEducation(edu))
}

}
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null,mapDispatchToProps)(Education);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';

class ProfileCred extends Component {
  render () {
    const { education } = this.props;

   const eduItem = education.map(edu => (
  <li key={edu._id}
   className="list-group-item">
   <h4>{edu.school}</h4>
  <p>
<Moment format="YYYY/MM/DD">{edu.from}</Moment> -
{edu.to === null ? ('present') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}

  </p>
  <p><strong>Degree:</strong>{edu.degree}</p>
    <p>{edu.fieldofstudy === '' ? null : (<span><strong>fieldofstudy:</strong>{edu.degree}</span>)}</p>

</li>
));

    return (
<div>
<div className="row">
<div className="col-md-6">
<h3 className="text-center text-info"> Education</h3>
{eduItem.length > 0 ? (
  <ul className="list-group">{eduItem}</ul>
) : (

  <p className="text-center">No Education Listed</p>
)

}
</div>
</div>
</div>
    )
  }
}

export default ProfileCred;

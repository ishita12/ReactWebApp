import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
const TextFieldGroup = (props) => {


  let inputElement = null;
  let err = props.error;
  let elType = props.elementConfig.placeholder;

if(elType==='email') {
  err = err.email;
}
if(elType === 'password') {
  err = err.password;
}
if(elType === 'name') {
  err = err.name;
}
if(elType === 'password2') {
  err = err.password2;
}
if(elType===''){
   err = null;
}
  switch(props.elementType) {

  case ('input'):
    inputElement =   <div className="form-group"> <input onChange={props.changed}
    className={classnames('form-control form-control-lg', {
      'is-invalid': err
    })}
    placeholder={props.placeholder}
    value={props.value}
    {...props.elementConfig}
    onChange={props.changed}
     />
     {props.info && <small className="form-text text-muted">{props.info}</small>}
     {err && <div className="invalid-feedback"> { err }</div>}
     </div>
    break;
  case ('textarea'):
    inputElement =   <div className="form-group"> <textarea onChange={props.changed}
    className={classnames('form-control form-control-lg', {
      'is-invalid': err
    })}
      placeholder={props.placeholder}
      value={props.value}
      {...props.elementConfig}
      onChange={props.changed}
    />
    {props.info && <small className="form-text text-muted">{props.info}</small>}
    {err && <div className="invalid-feedback"> {err}</div>}
    </div>
    break;
  case ('select'):
     inputElement = (
         <div className="form-group">
       <select
       className={classnames('form-control form-control-lg', {
         'is-invalid':  err
       })}
      value={props.value}
      onChange={props.changed} >
      {props.elementConfig.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
       </select>
       </div>
     );
     break;
  default:
    inputElement = <div className="form-group"> <input   className={classnames('form-control form-control-lg', {
        'is-invalid':  err
      })} />
        placeholder={props.placeholder}
        onChange={props.changed}
        value={props.value}
      </div>
}

  return (
    <div>
  {inputElement}
  </div>
  );
}



export default TextFieldGroup;

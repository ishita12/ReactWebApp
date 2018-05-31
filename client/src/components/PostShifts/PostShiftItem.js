import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../commons/TextFielddGroup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import * as postShiftActions from '../../actions/postShiftActions';

class PostShiftItem extends Component {

constructor(props) {
  super(props);
  const date = this.props.location.state.referrer;
  const date1 = new Date(date);
  const ds = new Date(date).toISOString();
  date1.setTime( date1.getTime() + date1.getTimezoneOffset()*60*1000 );
  console.log('okkk        '+date1.toDateString());
  console.log('date ->    '+ds)
  this.state = {

    postShiftForm: {
      shiftDate: {
        elementType: 'input',
        elementConfig: {
           type: 'text',
           placeholder: 'shiftDate',
           error: ''
        },
        value: date1.toDateString(),
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        disabled: true
      },
      hall: {
        elementType: 'select',
        elementConfig: {
          options: [{value: '', displayValue: ''},
                    {value: '337 Huntington', displayValue: '337 Huntington'},
                     {value: 'Northwest', displayValue: 'Northwest'},
                     {value: 'Melvin Hall', displayValue: 'Melvin Hall'},
                     {value: 'Kerr Hall', displayValue: 'Kerr Hall'},
                     {value: 'Light Hall', displayValue: 'Light Hall'},
                     {value: 'Rubenstein Hall', displayValue: 'Rubenstein Hall'},
                     {value: 'Burstein Hall', displayValue: 'Burstein Hall'},
                     {value: 'Stetson Hall', displayValue: 'Stetson Hall'}
                   ],
          placeholder: 'hall',
          error: ''
        },
        value: '',
        validation: {
            required: true
        },
        valid: true
      },
      shiftType: {
        elementType: 'select',
        elementConfig: {
          options: [ {value: '', displayValue: ''},
                     {value: 'A', displayValue: 'A'},
                     {value: 'B', displayValue: 'B'},
                     {value: 'C1', displayValue: 'C1'},
                     {value: 'C2', displayValue: 'C2'},
                     {value: 'D', displayValue: 'D'}
                   ],
          placeholder: 'shiftType',
          error: ''
        },
        value: '',
        validation: {
            required: true
        },
        valid: true
      },

  timeIn: {
    elementType: 'input',
    elementConfig: {
       type: 'text',
       placeholder: 'timeIn',
       error: ''
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    disabled: true
  },

  timeOut: {
    elementType: 'input',
    elementConfig: {
       type: 'text',
       placeholder: 'timeOut',
       error: ''
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false,
    disabled: true
  },
  hours: {
elementType: 'input',
elementConfig: {
   type: 'text',
   placeholder: 'hours',
   error: ''
},
value: '',
validation: {
  required: true
},
valid: false,
touched: false,
disabled: true
}
},
  errors: ''

  }
  this.inputChangedHandler = this.inputChangedHandler.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}









checkValidity(value, rules) {

let isValid = true;
if(!rules) {
return true;
}
if(rules.required) {
isValid = value.trim() !== '' && isValid;
}


return isValid;

}

inputChangedHandler =(event, inputIdentifier) => {
let timein=null;
let timeout = null;
let t1=null;
let t2=null;
const updatedPostShiftForm = {
  ...this.state.postShiftForm
};
let updatedFormElement = {
  ...updatedPostShiftForm[inputIdentifier]
};
updatedFormElement.value = event.target.value;
updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
updatedFormElement.touched = true;
updatedPostShiftForm[inputIdentifier] = updatedFormElement;

let formIsValid = true;

for(let inputIdentifier in updatedPostShiftForm) {
  formIsValid = updatedPostShiftForm[inputIdentifier].valid && formIsValid;
}

this.setState({postShiftForm: updatedPostShiftForm});

console.log('line 111111111    '+this.state.postShiftForm.shiftType.value);
console.log('line 155   '+updatedFormElement.elementConfig.placeholder);
console.log('line 156   '+this.state.postShiftForm.shiftType.elementConfig.placeholder);
console.log('line 157   '+updatedFormElement.value);
//if(updatedFormElement.elementConfig.placeholder === this.state.postShiftForm.shiftType.elementConfig.placeholder) {

  console.log('line 157   '+updatedFormElement.value);
  let shift = updatedFormElement.value;
  if(updatedFormElement.value === 'A') {
   timein = 8;
   timeout = 12;
   t1='8:00 AM';
   t2='12:00 PM';

   updatedFormElement = this.state.postShiftForm.timeIn;
   updatedFormElement.value = t1;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   console.log('line 168   '+this.state.postShiftForm.timeIn.value);
   updatedFormElement = this.state.postShiftForm.timeOut;
   updatedFormElement.value = t2;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.hours;
   updatedFormElement.value = 4.00;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});

    updatedFormElement = this.state.postShiftForm.shiftType;
    updatedFormElement.value = shift;
    updatedPostShiftForm[inputIdentifier] = updatedFormElement;
   this.setState({postShiftForm: updatedPostShiftForm});
  }
  if(updatedFormElement.value === 'B') {
   timein = 12;
   timeout = 16;
   t1='12:00 PM';
   t2='4:00 PM';
   updatedFormElement = this.state.postShiftForm.timeIn;
   updatedFormElement.value = t1;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
      console.log('line 194   '+this.state.postShiftForm.timeIn.value);
   updatedFormElement = this.state.postShiftForm.timeOut;
   updatedFormElement.value = t2;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.hours;
   updatedFormElement.value = 4.00;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
   this.setState({postShiftForm: updatedPostShiftForm});


   updatedFormElement = this.state.postShiftForm.shiftType;
   updatedFormElement.value = shift;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
  this.setState({postShiftForm: updatedPostShiftForm});
  }
  if(updatedFormElement.value === 'C1') {
   timein = 16;
   timeout = 20;
   t1='4:00 PM';
   t2='8:00 PM';
   updatedFormElement = this.state.postShiftForm.timeIn;
   updatedFormElement.value = t1;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.timeOut;
   updatedFormElement.value = t2;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.hours;
   updatedFormElement.value = 4.00;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
   this.setState({postShiftForm: updatedPostShiftForm});

   updatedFormElement = this.state.postShiftForm.shiftType;
   updatedFormElement.value = shift;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
  this.setState({postShiftForm: updatedPostShiftForm});
  }
  if(updatedFormElement.value === 'C2') {
   timein = 20;
   timeout = 24;
   t1='8:00 PM';
   t2='12:00 PM';
   updatedFormElement = this.state.postShiftForm.timeIn;
   updatedFormElement.value = t1;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.timeOut;
   updatedFormElement.value = t2;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.hours;
   updatedFormElement.value = 4.00;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
   this.setState({postShiftForm: updatedPostShiftForm});

   updatedFormElement = this.state.postShiftForm.shiftType;
   updatedFormElement.value = shift;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
  this.setState({postShiftForm: updatedPostShiftForm});
  }
  if(updatedFormElement.value === 'D') {
   timein = 0;
   timeout = 8;
   t1='12:00 AM';
   t2='8:00 AM';
   updatedFormElement = this.state.postShiftForm.timeIn;
   updatedFormElement.value = t1;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.timeOut;
   updatedFormElement.value = t2;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
   updatedFormElement = this.state.postShiftForm.hours;
   updatedFormElement.value = 8.00;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
   this.setState({postShiftForm: updatedPostShiftForm});


   updatedFormElement = this.state.postShiftForm.shiftType;
   updatedFormElement.value = shift;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;
  this.setState({postShiftForm: updatedPostShiftForm});
  }
//}


}

  onSubmit(event) {
    event.preventDefault();

    const shiftPosted = {

        hall: this.state.postShiftForm.hall.value,
        shiftType: this.state.postShiftForm.shiftType.value,
        timeIn: this.state.postShiftForm.timeIn.value,
        timeOut: this.state.postShiftForm.timeOut.value,
        hours: this.state.postShiftForm.hours.value,
        shiftDate: this.state.postShiftForm.shiftDate.value
    }



  console.log('line 216   '+shiftPosted.shiftDate+'   '+shiftPosted.hall+ '   '+shiftPosted.timeIn+ '    '+shiftPosted.timeOut+'   '+shiftPosted.shiftType);
  this.props.registerShift(shiftPosted, this.props.history);




  }

  componentWillReceiveProps = (nextProps) => {
  console.log('inside next props   ');
  /*
  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});
    console.log(this.state.errors);
  }*/
  }

render () {

const {errors} = this.state;
const ddd = this.props.location.state.referrer;

console.log('line 15   '+new Date(ddd));



const formElementArray = [];

for(let key in this.state.postShiftForm) {
console.log('line 147  '+key);
  formElementArray.push({
    id: key,
    config: this.state.postShiftForm[key]
  });
}

let form = formElementArray.map(formElement => (


<TextFieldGroup
key={formElement.id}
elementType={formElement.config.elementType}
elementConfig={formElement.config.elementConfig}
placeholder={formElement.config.elementConfig.placeholder}
value={formElement.config.value}
changed={(event) => this.inputChangedHandler(event, formElement.id)}
error={formElement.config.elementConfig.error}
inValid={!formElement.config.valid}
disabled={formElement.config.disabled}
touched={formElement.config.touched}
/>

));

   return (

     <div className="postShiftItem">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center"></h1>
               <p className="lead text-center">Post Shift details</p>
               <form onSubmit={this.onSubmit}>

               {form}
                 <input type="submit" className="btn btn-info btn-block mt-4" />
               </form>
               <Link to="/dashboard" className="btn btn-warning  mt-4">
               Back
               </Link>
             </div>
           </div>
         </div>
       </div>



   );





  }
}
PostShiftItem.propTypes = {
  registerShift: PropTypes.func.isRequired,
  errors:  PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
  errors: state.errReducer
  }
}

const mapDispatchToProps = dispatch => {

return {
registerShift:  (shiftPosted, history) => dispatch(postShiftActions.registerShift(shiftPosted, history))
}

}


export default connect(mapStateToProps, mapDispatchToProps)(PostShiftItem);

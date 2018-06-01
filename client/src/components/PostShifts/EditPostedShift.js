import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../commons/TextFielddGroup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../commons/Spinner';
import { withRouter } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import * as postShiftActions from '../../actions/postShiftActions';

class EditPostedShift extends Component {

constructor(props) {
  super(props);
  const shiftId = this.props.location.state.referrer;
  console.log('inside constructor   '+shiftId);
  this.state = {

    errors: {},
    postShiftForm: {
      shiftDate: {
        elementType: 'input',
        elementConfig: {
           type: 'date',
           placeholder: 'shiftDate',
           error: ''
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
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
}

  }
  this.inputChangedHandler = this.inputChangedHandler.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}



  componentWillReceiveProps = (nextProps) => {

  if(nextProps.errors) {
    this.setState({errors: nextProps.errors});

  }
if(nextProps.shift.shift) {
  const shift = nextProps.shift.shift;
 shift.shiftDate = !isEmpty(shift.shiftDate) ? shift.shiftDate: '';
 shift.hall = !isEmpty(shift.hall) ? shift.hall: '';
shift.shiftType = !isEmpty(shift.shiftType) ? shift.shiftType: '';
shift.timeIn = !isEmpty(shift.timeIn) ? shift.timeIn: '';
shift.timeOut = !isEmpty(shift.timeOut) ? shift.timeOut: '';
shift.hours = !isEmpty(shift.hours) ? shift.hours: '';




const updatedPostShiftForm = {
...this.state.postShiftForm
};
let updatedFormElement = {};
if(this.state.postShiftForm.hall){
 updatedFormElement = {
  ...updatedPostShiftForm['hall']
};
updatedFormElement.value = shift.hall;
updatedPostShiftForm['hall'] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});
}

if(this.state.postShiftForm.shiftDate){
 updatedFormElement = {
  ...updatedPostShiftForm['shiftDate']
};
let a = shift.shiftDate;
let b = new Date(a);
console.log('date is   '+b+'    '+b.toDateString());




    let  month = '' + (b.getMonth() + 1);
    let  day = '' + b.getDate();
    let  year = b.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  let ress= [year, month, day].join('-');








updatedFormElement.value = ress;
updatedPostShiftForm['shiftDate'] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});

}
if(this.state.postShiftForm.shiftType){
 updatedFormElement = {
  ...updatedPostShiftForm['shiftType']
};
updatedFormElement.value = shift.shiftType;
updatedPostShiftForm['shiftType'] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});

}
if(this.state.postShiftForm.timeIn){
 updatedFormElement = {
  ...updatedPostShiftForm['timeIn']
};
updatedFormElement.value = shift.timeIn;
updatedPostShiftForm['timeIn'] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});
}
if(this.state.postShiftForm.timeIn){
 updatedFormElement = {
  ...updatedPostShiftForm['timeOut']
};
updatedFormElement.value = shift.timeOut;
updatedPostShiftForm['timeOut'] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});
}
if(this.state.postShiftForm.hours){
 updatedFormElement = {
  ...updatedPostShiftForm['hours']
};
updatedFormElement.value = shift.hours;
updatedPostShiftForm['hours'] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});
}
this.setState({postShiftForm: updatedPostShiftForm});

}

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
console.log('chnged hall is    '+event.target.value);
updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
updatedFormElement.touched = true;
updatedPostShiftForm[inputIdentifier] = updatedFormElement;
this.setState({postShiftForm: updatedPostShiftForm});
let formIsValid = true;

for(let inputIdentifier in updatedPostShiftForm) {
  formIsValid = updatedPostShiftForm[inputIdentifier].valid && formIsValid;
}




  let shift = updatedFormElement.value;
  if(updatedFormElement.value === 'A') {
   timein = 8;
   timeout = 12;
   t1='8:00 AM';
   t2='12:00 PM';


   updatedFormElement = this.state.postShiftForm.hall;
   updatedFormElement.value =  event.target.value;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});
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
   updatedFormElement = this.state.postShiftForm.hall;
   updatedFormElement.value =  event.target.value;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});

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


   updatedFormElement = this.state.postShiftForm.hall;
   updatedFormElement.value =  event.target.value;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});

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

   updatedFormElement = this.state.postShiftForm.hall;
   updatedFormElement.value =  event.target.value;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});

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


   updatedFormElement = this.state.postShiftForm.hall;
   updatedFormElement.value =  event.target.value;
   updatedPostShiftForm[inputIdentifier] = updatedFormElement;

   this.setState({postShiftForm: updatedPostShiftForm});

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

    const errors = {};
      const dd = new Date(this.state.postShiftForm.shiftDate.value);

    const today = new Date(Date.now());
    dd.setTime( dd.getTime() + dd.getTimezoneOffset()*60*1000 );
    console.log('lets compare the dates   '+dd +'        '+today);


    if(dd < today) {

    errors.passedDate = "This date has already passed. You cannot edit this shift";
    this.setState({errors: errors});
  //  this.props.history.push('/postShifts');
    console.log('line 28   '+dd);
    }
    if(dd === today) {

console.log('yes today date matching    ');
      const updatedPostShiftForm = {
      ...this.state.postShiftForm
      };
      let updatedFormElement = {};
      if(this.state.postShiftForm.hall){
       updatedFormElement = {
        ...updatedPostShiftForm['hall']
      };
      updatedFormElement.value = shiftPosted.hall;
      updatedPostShiftForm['hall'] = updatedFormElement;
      this.setState({postShiftForm: updatedPostShiftForm});
      }
      if(this.state.postShiftForm.shiftDate){
       updatedFormElement = {
        ...updatedPostShiftForm['hall']
      };
      updatedFormElement.disabled = true;
      updatedPostShiftForm['shiftDate'] = updatedFormElement;
      this.setState({postShiftForm: updatedPostShiftForm});
      }
      if(this.state.postShiftForm.shiftType){
       updatedFormElement = {
        ...updatedPostShiftForm['shiftType']
      };
      updatedFormElement.disabled = true;
      updatedPostShiftForm['shiftType'] = updatedFormElement;
      this.setState({postShiftForm: updatedPostShiftForm});
      }


    }
if(dd > today) {


  console.log('line 216   '+shiftPosted.shiftDate+'   '+shiftPosted.hall+ '   '+shiftPosted.timeIn+ '    '+shiftPosted.timeOut+'   '+shiftPosted.shiftType);
  this.props.updateSingleShift(shiftPosted, this.props.history);

}


  }

  componentDidMount() {
    const id = this.props.location.state.referrer;
    console.log('line 340    '+id);
    this.props.getSinglePostedShift(id);


  }


render () {

const {errors} = this.state;
const  {shift}  = this.props.shift;
console.log('line !!!!!!!!!!!   '+typeof shift+'      ');
let test = null;
if(shift === null || shift === undefined) {

} else {

  console.log('shift hall is   '+shift.hall+'    '+shift.shiftDate+'     '+shift.shiftType+'    '+shift.timeIn+'     '+shift.timeOut);

  //this.setValues(shift.hall, shift.shiftDate, shift.shiftType, shift.timeIn, shift.timeOut, shift.timeOut);





}
if(shift === null ) {
  test = <Spinner />;
} else {

  const formElementArray = [];

  for(let key in this.state.postShiftForm) {
  console.log('line 147  '+key);
    formElementArray.push({
      id: key,
      config: this.state.postShiftForm[key]
    });
  }

  test = formElementArray.map(formElement => (


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

}



   return (

     <div className="postShiftItem">
         <div className="container">
           <div className="row">
             <div className="col-md-8 m-auto">
               <h1 className="display-4 text-center"></h1>
               <p className="lead text-center">Post Shift details</p>
               <form onSubmit={this.onSubmit}>
                {test}

                 <input type="submit" className="btn btn-info btn-block mt-4" />
               </form>
               <h3 style={{color:'red'}}>{this.state.errors.passedDate ? this.state.errors.passedDate : null} </h3>
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
EditPostedShift.propTypes = {
  updateSingleShift: PropTypes.func.isRequired,
  errors:  PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
  shift: state.postShiftReducer,
  errors: state.errReducer
  }
}

const mapDispatchToProps = dispatch => {

return {
updateSingleShift:  (shiftPosted, history) => dispatch(postShiftActions.updateSingleShift(shiftPosted, history)),
getSinglePostedShift: (id) => dispatch(postShiftActions.getSinglePostedShift(id))
}

}


export default connect(mapStateToProps, mapDispatchToProps)(EditPostedShift);

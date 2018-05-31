const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const ProctorClaimSchema = new Schema({
 user: {
   type: Schema.Types.ObjectId,
   ref: 'Users'
 },
   sid: {
     type: String,
     required: true
   },
   hall: {
     type: String,
     required: true
   },
   shiftDate: {
     type: Date,
     required: true
   },
  shiftType: {
    type: String,
    required: true
  },
  timeIn: {
    type: String,
    required: true
  },
  timeOut: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
  }

});

module.exports  = mongoose.model('ProctorClaimShift', ProctorClaimSchema);

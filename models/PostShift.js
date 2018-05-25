const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const PostShiftSchema = new Schema({
 user: {
   type: Schema.Types.ObjectId,
   ref: 'Users'
 },
 hall: {
   type: String,
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

module.exports  = mongoose.model('PostShift', PostShiftSchema);

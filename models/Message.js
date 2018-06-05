const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
 user: {
   type: Schema.Types.ObjectId,
   ref: 'Users'
 },
 sid: {
   type: String
 },
 hall: {
   type: String
 },
 shiftType: {
   type: String
 },
shiftDate: {
  type: Date
},
timeIn: {
  type: String
},
timeOut: {
  type: String
},
hours: {
  type: Number
},
message: {
  type: String,
  required: true
}
});

module.exports  = mongoose.model('Message', MessageSchema);

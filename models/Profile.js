const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
 user: {
   type: Schema.Types.ObjectId,
   ref: 'Users'
 },
 handle: {
   type: String,
   required: true,
   max: 40
 },
department: {
  type: String
},
location: {
  type: String
},
status: {
  type: String,
  required: true
}
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);

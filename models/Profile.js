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
},
experience: [
    {
      title: {
        type: String
      },
      dept: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ]
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);

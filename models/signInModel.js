const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        }
      ]
})

const SignUpDetails = mongoose.model("SignInDetails", signUpSchema);

module.exports = SignUpDetails;
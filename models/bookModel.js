const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publishedYear:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'SignInDetails',
          required: true
        }
      ]
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
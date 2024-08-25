const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:String,
    content:String
  });
  
  module.exports= mongoose.model("blog",postSchema);
// module.exports = mongoose.model('Book', BookSchema);
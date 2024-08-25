//jshint esversion:6
// here we have untouch project at 09-blog at github
// here we have to use env .gitignore models , mongos altas to deploy website

require("dotenv").config();
// require('dotenv').config({ path: 'ENV_FILENAME' });
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts = [];
mongoose.set('strictQuery', false);
// mongoose.connect("mongodb+srv://sankalpturankar567:9Hxl44PiTuIWZC2I@cluster0.x6tcjqn.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser : true});
// console.log('Mongo URI:', process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// const postSchema = new mongoose.Schema({
//   title:String,
//   content:String
// });

// const Post = mongoose.model("blog",postSchema);

// they are in models/post.js

const Post = require("./models/post")

// Post.find(function(err,persons){
//   // it will directly give array of all record in collections
//   if(err){
//       console.log(err);
//   }else{
//       // mongoose.connection.close();
//       // we use this to close connect which we set up in this program
//       // console.log(persons);
//       persons.forEach( function(element){
//           console.log(element);
//       });
//   }
// });

app.get("/", function(req, res){
  Post.find(function(err,posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post( {
    title :req.body.postTitle,
    content :req.body.postBody
  });

  // posts.push(post);
  post.save();

  res.redirect("/");

});

app.get("/posts/:postId", function(req, res){
  // const requestedTitle = _.lowerCase(req.params.postId);
  const requestedTitle = req.params.postId;

  

  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });
  Post.findOne({_id : requestedTitle},function(err,post){
    res.render("post", {
      title: post.title,
      content: post.content
    });

  })

});

// app.listen(process.env.PORT|| 3000, function() {
//   console.log("Server started on port 3000");
// });

//Connect to the database before listening
connectDB().then(() => {
  app.listen(process.env.PORT|| 3000, () => {
      console.log("listening for requests");
  })
})

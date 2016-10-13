var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Blog = new Schema({
  Username:String,
  Title:String,
  Article:String,
  Tags:String,
  CreateDate:Date
});

var Comment = new Schema({
  Visitor:String,
  Comment: String,
  MessageID: Schema.Types.ObjectId,
  CreateDate:Date
});

mongoose.model('Blog', Blog);
mongoose.model('Comment',Comment);
mongoose.connect('mongodb://localhost/blog');

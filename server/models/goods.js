var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "checked":String,
  "productNum":Number,
});

module.exports = mongoose.model('Good',produtSchema);//自动补充s，进行数据库的查找

const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
  }
})

//透過 module.exports 輸出
module.exports = mongoose.model('Category', categorySchema)
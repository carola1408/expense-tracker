const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Number,
    ref: 'Category',
    index: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

//透過 module.exports 輸出
module.exports = mongoose.model('Record', recordSchema)
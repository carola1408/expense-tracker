// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入models
const Record = require('../../models/record')
const Category = require('../../models/category')

// 設定首頁路由
router.get('/', (req, res) => {
  const categories = []
  const userId = req.user._id;
  const categoryId = Number(req.query.sortByCategory)
  // 一開始categoryId是undefined，或是全部類別，就把所有資料撈出來; 否則就去撈前端傳回來的categoryId

  const filter = categoryId ? { userId, categoryId } : { userId }

  // 先把所有的category找出來再放到categories陣列，最後再傳回前端
  Category.find()
    .lean()
    // 將類別依Category.id去作升冪排列
    .sort({ id: 1 })
    .then(category => categories.push(...category))
    .then(() => {
      Record.find(filter)
        .lean()
        .sort({ date: "desc" })
        .then((records) => {
          let totalAmount = 0;
          records.forEach((record) => {
            totalAmount += record.amount;
            record.date = record.date.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
          });
          // 記得要把categories/categoryId要傳到前端
          res.render("index", { records, totalAmount, categories, categoryId });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err))
});
//匯出路由模組
module.exports = router;

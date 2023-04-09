const Category = require('../category') // 載入 category model
const db = require('../../config/mongoose') // 載入 mongoose


const CATEGORY = {
  家居物業: 'fa-solid fa-house',
  交通出行: 'fa-solid fa-van-shuttle',
  休閒娛樂: 'fa-solid fa-face-grin-beam',
  餐飲食品: 'fa-solid fa-utensils',
  其他: 'fa-solid fa-pen',
}


//新增資料
db.once('open', () => {
  console.log('mongodb connected!')
  for (const [name, icon] of Object.entries(CATEGORY)) {
    Category.create({
      name,
      icon,
    })
  }
  console.log('done')
})
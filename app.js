const express = require('express')
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//主頁
app.get('/', function (req, res) {
  const restaurants = restaurantsList.results
  res.render('index', { restaurants })
})

//餐廳詳細資訊
app.get('/restaurants/:restaurant_id', function (req, res) {
  const restaurant = restaurantsList.results.find(function (item) {
    return item.id == req.params.restaurant_id
  })
  res.render('show', { restaurant })
})

//搜尋列表
app.get('/search', function (req, res) {
  const keyword = req.query.keyword
  const matchRestaurant = restaurantsList.results.filter(function (item) {
    return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword)
  })
  res.render('index', { restaurants: matchRestaurant, keyword })
})

app.listen(port, function () {
  console.log('localhost:3000')
})
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const { Recipe } = require('./RecipeModal')
const { Order } = require('./OrderModal')
const http = require('http')

dotenv.config()
const PORT = process.env.PORT || 5000

async function main() {
  //Connect to database
  const query = process.env.QUERY.replace('<USERNAME>', process.env.MONGO_USERNAME).replace('<PASSWORD>', process.env.MONGO_PASSWORD)
  console.log(query);
  await mongoose.connect(query)
  const app = express()

  //CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //BODY PARSER
  app.use(express.json())

  const server = http.createServer(app)

  app.get('/recipies', async (req, res) => {
    const recipePerPage = 10
    const page = req.query.page || 1
    const skipRecipes = (page - 1) * recipePerPage
    const recipes = await Recipe.find().skip(skipRecipes).limit(recipePerPage)
    res.status(200).json(recipes)
  })

  app.get('/recipies/:id', async (req, res) => {
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) {
      return res.status(500).json({ error: 'No Such recipe exists.' })
    }
    const recipe = await Recipe.find({ _id: id })
    res.status(200).json(recipe)
  })
  app.get('/recipies-count/', async (req, res) => {
    const recipesCount = await Recipe.find().countDocuments()
    res.status(200).json({ total: recipesCount })
  })

  app.post('/order', async (req, res) => {
    const orderData = req.body

    //TODO : handle order data for security reasons
    const order = new Order({ userInfo: orderData.userInfo, items: orderData.items })
    const r = await order.save()
    res.json(r)
  })
  server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
  })

}

main().catch((err) => {
  console.log(`Something went wrong---${err}`);
})
const mongoose = require('mongoose')

const Recipe = mongoose.Schema({
  description: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  price: mongoose.Schema.Types.Number
})

const RecipeModal = mongoose.model('Recipe', Recipe, 'Recipies')

module.exports.Recipe = RecipeModal
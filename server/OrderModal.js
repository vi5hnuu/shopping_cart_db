const mongoose = require('mongoose')

const Order = mongoose.Schema({
  userInfo: {
    name: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
    postalCode: mongoose.Schema.Types.String,
    address: mongoose.Schema.Types.String
  },
  items: {
    "type": [
      "Mixed"
    ]
  }
})

const OrderModal = mongoose.model('Order', Order, 'Orders')

module.exports.Order = OrderModal
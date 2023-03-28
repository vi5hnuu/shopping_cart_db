import React from "react";

const cartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => { },
  removeItem: (id, times) => { },
  clearCart: () => { }
})
cartContext.displayName = 'Cart-provider'

export default cartContext;
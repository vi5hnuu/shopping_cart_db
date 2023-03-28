import { useReducer } from "react";
import cartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
}
function cartReducer(pState, action) {
  console.log("Use Reducer");
  if (action.type === 'ADD') {
    const uItems = [...pState.items]
    // console.log(uItems);
    const exists = uItems.find(item => item.id === action.item.id)
    if (exists) {
      exists.times = +exists.times + +action.item.times
      // console.log(exists.times);
    } else {
      uItems.push(action.item)
    }
    // console.log(uItems);
    return { items: uItems, totalAmount: pState.totalAmount + action.item.times * action.item.amount }
  } else if (action.type === 'REMOVE') {
    let uitems = [...pState.items]
    let newTotalAmount = pState.totalAmount

    uitems = uitems.filter(item => {
      if (item.id === action.data.id) {
        if (item.times - action.data.times <= 0) {
          newTotalAmount -= item.times * item.amount
          return false;
        }
        newTotalAmount -= action.data.times * item.amount
        item.times -= action.data.times
      }
      return true;
    })

    return { items: uitems, totalAmount: newTotalAmount }
  } else if (action.type === 'CLEAR') {
    return { items: [], totalAmount: 0 }
  }
  return defaultState
}

function CartProvider(props) {
  const [state, dispatchAction] = useReducer(cartReducer, defaultState)

  function addToCartHandler(item) {
    dispatchAction({ type: 'ADD', item })
  }
  function removeFromCartHandler(id, times) {
    dispatchAction({ type: 'REMOVE', data: { id, times } })
  }
  function clearCartHandler() {
    dispatchAction({ type: 'CLEAR' })
  }
  const cart = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart: clearCartHandler
  }
  return <cartContext.Provider value={cart}>
    {props.children}
  </cartContext.Provider>
}
export default CartProvider;
import React, { useContext, useState } from 'react'
import cartContext from '../store/cart-context'
import Amount from './Amount'
import Backdrop from './BackDrop'
import styles from './Cart.module.css'
import CartItems from './CartItems'
import CheckoutForm from './CheckoutForm'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'

function Cart(props) {
  const ctx = useContext(cartContext)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function checkoutFormVisibilityHandler() {
    setIsCheckingOut(true)
  }

  function checkOutHandler({ name, email, address, pCode }) {
    setIsLoading(true);
    (async () => {
      //we store reference of recipe in database[ie only ids]
      const itemId_times = ctx.items.map(item => { return { _id: item.id, times: item.times } })
      const order = { userInfo: { name, email, postalCode: pCode, address }, items: itemId_times }
      try {
        const r = await axios.post('http://localhost:5000/order', order)
      } finally {
        ctx.clearCart()
        setIsLoading(false);
        setIsCheckingOut(false)
      }
    })()
  }
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return <React.Fragment>
    <Backdrop />
    <div className={styles['cart-container']}>
      <h2>Cart Items</h2>
      <ClipLoader
        color='#2d6a4f'
        loading={isLoading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {!isLoading && <>
        <CartItems items={ctx.items} />
        <div className={styles['grand-total']}>
          <p>Total Amount</p>
          <Amount currency='$' amount={ctx.totalAmount} />
        </div>
        {!isCheckingOut && <div className={styles['cart-actions']}>
          <button onClick={props.onClose} className={styles['btn-close']}>Close</button>
          {ctx.items.length > 0 && <button onClick={checkoutFormVisibilityHandler} className={styles['btn-order']}>Order</button>}
        </div>}
        {isCheckingOut && <CheckoutForm onCheckOut={checkOutHandler} onCancel={props.onClose} />}
      </>}
    </div>
  </React.Fragment>
}

export default Cart
import CartItem from './CartItem'
import styles from './CartItems.module.css'

function CartItems(props) {
  return <ul className={styles['cart_items']}>
    {props.items.map(item => <CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} times={item.times} />)}
  </ul>
}

export default CartItems;
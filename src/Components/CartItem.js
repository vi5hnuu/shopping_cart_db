import { useContext } from 'react';
import cartContext from '../store/cart-context';
import Amount from './Amount';
import styles from './CartItem.module.css'

function CartItem(props) {
  const ctx = useContext(cartContext)
  function incCountHandler() {
    ctx.addItem({ id: props.id, times: 1, amount: props.amount })
  }
  function decCountHandler() {
    ctx.removeItem(props.id, 1)
  }
  function removeItemHanler() {
    ctx.removeItem(props.id, props.times)
  }
  console.log('Cart Item');
  return <li className={styles['cart-item']}>
    <p className={styles['item-name']}>{props.name}</p>
    <div>
      <div>
        <span className={styles['times']}>x</span>
        <span className={styles['times-value']}>{props.times}</span>
      </div>
      <Amount currency='$' amount={props.amount} />
    </div>
    <div className={styles['cart-item_actions']}>
      <button onClick={removeItemHanler} className={styles['btn-remove']}>X</button>
      <div>
        <button onClick={incCountHandler} className={styles['btn-addOne']}>+</button>
        <button onClick={decCountHandler} className={styles['btn-subOne']}>-</button>
      </div>
    </div>
  </li>
}

export default CartItem;
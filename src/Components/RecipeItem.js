import { useContext } from 'react';
import cartContext from '../store/cart-context';
import Amount from './Amount';
import RecipeForm from './RecipeForm';
import styles from './RecipeItem.module.css'

function RecipeItem(props) {
  const ctx = useContext(cartContext)

  function addToCarthandler(times) {
    const it = { id: props.id, times, name: props.name, amount: props.price }
    ctx.addItem(it)
  }

  return <li className={styles['recipe-item']}>
    <div className={styles['recipe-detail']}>
      <h3>{props.name}</h3>
      <p className={styles['recipe-discription']}>{props.discription}</p>
      <Amount currency='$' amount={props.price} />
    </div>
    <RecipeForm onAdd={addToCarthandler} />
  </li>
}
export default RecipeItem;
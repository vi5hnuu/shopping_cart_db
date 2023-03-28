import { useRef } from 'react';
import styles from './RecipeForm.module.css'

function RecipeForm(props) {
  const inp = useRef(null)
  function addToCartHandler(evnt) {
    const times = +inp.current.value
    inp.current.value = 1
    props.onAdd(times)
  }
  return <div className={styles['recipe-action_container']}>
    <div className={styles['recipe-control']}>
      <span>X</span>
      <input ref={inp} type="number" min='1' max='10' defaultValue='1' />
    </div>
    <div className={styles['recipe-actions']}>
      <button onClick={addToCartHandler} className={styles['btn-add']}>Add</button>
    </div>
  </div>
}

export default RecipeForm;
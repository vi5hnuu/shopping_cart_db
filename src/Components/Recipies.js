import styles from './Recipies.module.css'
import RecipeItem from './RecipeItem';
import SyncLoader from "react-spinners/SyncLoader";


const loaderOverride = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2.5rem",
};
function Recipies(props) {
  const recipies = props.recipies;
  const isLoading = props.isLoading

  return <ul className={styles['recipe-list']}>
    <SyncLoader cssOverride={loaderOverride} loading={isLoading} color="#2d6a4f" />
    {!isLoading && recipies.length === 0 && <li className={styles['no-recipe']}>No Recipe Found.</li>}
    {!isLoading && recipies.length > 0 && recipies.map(recipe => <RecipeItem key={recipe._id} id={recipe._id} name={recipe.name} discription={recipe.description} price={recipe.price} />)}
  </ul>
}

export default Recipies;
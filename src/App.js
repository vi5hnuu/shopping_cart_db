import './App.css';
import React, { useContext } from 'react';
import Header from './Components/Header';
import heroImage from './assets/hero_image.jpg'
import Recipies from './Components/Recipies';
import cartContext from './store/cart-context';
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const cartctx = useContext(cartContext)
  const [isLoading, setIsLoading] = useState(false)
  const [pageCountIsLoading, setPageCountIsLoading] = useState(false)
  const [recipies, setRecipies] = useState([])
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    getRecipeForPage(1).then(recipies => {
      setIsLoading(false)
      setRecipies(recipies)
    }, (err) => {
      setIsLoading(false)
    })
  }, [])
  useEffect(() => {
    getRecipeCount().then((pageCount) => {
      setPageCount(pageCount)
    })
  }, [])
  async function getRecipeCount() {
    setPageCountIsLoading(true)
    const { total } = await (await axios.get('http://localhost:5000/recipies-count')).data
    setPageCountIsLoading(false)
    return Math.ceil((total * 1.0) / 10)
  }
  async function onPageChangeHandler({ selected }) {
    setIsLoading(true)
    try {
      const selectedPage = selected + 1
      const recipies = await getRecipeForPage(selectedPage)
      setRecipies(recipies)
    } finally {
      setIsLoading(false)
    }
  }
  async function getRecipeForPage(selectedPage) {
    const res = await axios.get(`http://localhost:5000/recipies?page=${selectedPage}`)
    // res.statusCode
    const recipies = res.data
    return recipies;
  }

  return (
    <React.Fragment>
      <Header count={cartctx.items.length} />
      <div className='hero-container'>
        <div className='hero-image-container'>
          <img src={heroImage} alt='hero' />
        </div>
        <div className='hero-intro'>
          <h2>Delicious Food, Delivered To You</h2>
          <p>Choose your meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
          <p>All our meals are cooked with high quality ingredients, Just-in-time and of course by experienced chefs!</p>
        </div>
      </div>
      <section className='recipe-container'>
        <h3 className='recipe-container_title'>
          Delicious Food
        </h3>
        <Recipies isLoading={isLoading} recipies={recipies} />
        <ReactPaginate
          pageCount={pageCount}
          initialPage={0}
          breakLabel='...'
          className='paginate'
          activeClassName='paginate-active'
          disabledClassName='paginate-inactive'
          nextLabel='>>'
          previousLabel='<<'
          nextClassName='paginate-next'
          previousClassName='paginate-prev'
          onPageChange={onPageChangeHandler}
        />
      </section>
      <footer>
        &copy; copyright 2023 (vishnu kumar)
      </footer>
    </React.Fragment>
  );
}

export default App;

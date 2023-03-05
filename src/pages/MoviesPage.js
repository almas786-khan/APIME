import React, { useState, useEffect } from 'react'

import SearchBox from '../components/SearchBox'
import styled from 'styled-components'
import axios from 'axios'
import Movie from '../components/Movie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Sort from '../components/Sort'

function MoviesPage({ use, setUse }) {
  const [movies, setMovies] = useState([])
  const [value, setValue] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [filter, setFilter] = useState('')
  const url = '/apime/movies'

  //const [filter, setFilter] = useState({
  //title:'',
  //page:'1',
  //category:'',
  //sort:''
  //})
  const [url1, setUrl] = useState()

  useEffect(() => {
    const setRequest = async () => {
      setUrl(`/apime/movies?title=${value}&category=${filter}&sort=${sortValue}`)
    }

    setRequest();

  }, [value, filter, sortValue])


  useEffect(() => {
    const initializePage = async () => {
      try {
        const { data: { movies } } = await axios.get(url)
        setMovies(movies)
        const data = await axios.get('apime/user/userCheck')
        setUse(data.data.user.username)
      }
      catch (error) {
        console.log(error)
      }
    }

    initializePage();


  }, [])
  const clearFilter = async () => {
    setValue("");
    setFilter("");
    setSortValue("");
    try {
      const { data: { movies } } = await axios.get(url)
      setMovies(movies);
    }
    catch (error) {
      console.log(error)
    }

  }
  const handleSearch = async (e) => {

    e.preventDefault();
    try {
      const { data: { movies } } = await axios.get(url1)
      setMovies(movies);
    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <main>
      <Wrapper className='section'>
        <div className='title'>
          <h2>Movies</h2>
          <div className='underline'></div></div>


        <div className='content'>
          <form onSubmit={handleSearch}>
            <div className='form-control'>

              <input type='text'
                className='search-input'
                placeholder='Search Movie'
                value={value}
                onChange={(e) => setValue(e.target.value)} />

            </div>



            <div className='form-control'>
              <label htmlFor='filter'>Category</label>
              <select
                name='filter' id='filter' className='filter-input' onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value=''>All</option>
                <option value='Drama'>Drama</option>
                <option value='Action'>Action</option>
                <option value='Adventure'>Adventure</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='Horror'>Horror</option>
                <option value='Mystery'>Mystery</option>
                <option value='Romance'>Romance</option>
                <option value='Sci-fi'>Sci-fi</option>
                <option value='Thriller'>Thriller</option>
              </select>
            </div>

            <div className='form-control'>
              <label htmlFor='sort'>Sort by</label>
              <select
                name='sort' id='sort' className='sort-input' onChange={(e) => setSortValue(e.target.value)} value={sortValue}>
                <option value='title'>title (a - z)</option>
                <option value='-title'>title (z - a)</option>
              </select>
            </div>
            <input type='submit' value='Submit' className='submit-btn' />
            <button type='button' className='clear-btn' onClick={clearFilter}>
              Clear filters
            </button>
          </form>

        </div>

        <div>
          <section>
            <div className='section-center featured'>
              {/* <MovieList movies={movies} /> */}
              {/*   {movies.map(mv => (
                <Movie key={mv._id}{...mv}>

                </Movie>
              ))} */}
              {movies.length < 1 ? <h3>Sorry, no movie matched your search.</h3> :
                movies.map(mv => (
                  <Movie key={mv._id}{...mv}>

                  </Movie>
                ))
              }

            </div>
          </section>
        </div>


      </Wrapper>
    </main >
  )
}
const Wrapper = styled.section`
 .form-control {
    margin-bottom: 1.25rem;
    width: 45%;

    label{
      padding-right: 0.5rem;
    }
     
    h5 {
      margin-bottom: 0.5rem;
    }
  }
 
   .search-input {
    
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  background: var(--clr-primary-00);

  .featured {
    margin: 4rem auto;
    display: grid;
   
    gap: 2.5rem;
    img {
      height: 225px;
      
    }
  }
  .title{
    color :var(--clr-primary-01)
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
   .container {
    position: relative;
    background: var(--clr-primary-02);
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
      float:left;
      width:25%;
      padding-left: 150px;
     
    
    }
  }
   .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    margin-left: 0.5rem;
    width: 22%;
  }
  .submit-btn {
    background: var(--clr-primary-01);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
     width: 21%;
  }
   
`

export default MoviesPage;
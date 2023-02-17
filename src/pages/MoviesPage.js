
import React, { useState, useEffect } from 'react'
import SearchBox from '../components/SearchBox'
import styled from 'styled-components'
import axios from 'axios'
import Movie from '../Movie'
const url = '/apime/movies'
function MoviesPage({ use, setUse }) {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState([]);
  useEffect(() => {
    const initializePage = async () => {
      try {
        const { data: { movies } } = await axios.get(url)
        setMovies(movies)
        console.log(movies)
        const data = await axios.get('apime/user/userCheck')
        setUse(data.data.user.username)
      }
      catch (error) {
        console.log(error)
      }
    }

    initializePage();

  }, [])

  return (
    <>
      <Wrapper className='section'>
        <div className='title'>
          <h2>Movies</h2>
          <div className='underline'></div>
          <div>
            <SearchBox class="search" searchValue="aaa" />
          </div>
        </div>
        <div className='section-center featured'>
          {movies.map(mv => (
            <Movie key={mv._id}{...mv}>

            </Movie>
          ))}
        </div>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.section`
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
`

export default MoviesPage;
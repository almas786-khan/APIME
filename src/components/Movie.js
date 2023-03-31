import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Stars from '../components/Stars';


const Movie = ({ image, title, _id, category, movieRating }) => {

  return (
    <Wrapper>
      <div className='container'>
        <img src={image} alt={title} />
        <Link to={`/movies/${_id}`} className='link'>
          <FaSearch />
        </Link>
      </div>
      <footer className='mt-2'>
        <div className='row'>
          {/* <div className='col-md-8'>
            <p className='font-weight-bold'>{title}</p>
          </div>
          <div className='col-6 col-md-4'>
            <div className='row justify-content-end'>
              <div className='col-md-2'>
                {(parseFloat(movieRating)).toFixed(2)}
              </div>
              <div className='col'>
                <Stars rating={movieRating} />
              </div>
            </div>
          </div> */}
          <p className='font-weight-bold text-start'>{title}</p>
          <div className='row'>
              <div className='col-md-2'>
                {(parseFloat(movieRating)).toFixed(2)}
              </div>
              <div className='col'>
                <Stars rating={movieRating} />
              </div>
            </div>
          
        </div>
        <div></div>
      </footer>
    </Wrapper>
  )
}



const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-primary-02);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: contain;
    border-radius: var(--radius);
    transition: var(--transition);
  }

  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }`

export default Movie

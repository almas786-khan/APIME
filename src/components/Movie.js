import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Movie = ({ image, title, _id, category, movieRating }) => {

  return (
    <Wrapper>
      <div className='container'>
        <img src={image} alt={title} />
        <Link to={`/movies/${_id}`} className='link'>
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{title} {movieRating}
        </h5>

        <span className='fa fa-star checked'></span>

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
  .checked {
  color: orange;
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
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 600;
    font-size: 1rem;
    color: var(--clr-primary-5);
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`
export default Movie

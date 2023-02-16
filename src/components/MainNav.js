import styled from 'styled-components'
import logo from '../assets/iconn.svg'
import { FaBars } from 'react-icons/fa';
import { links } from '../data'
import React, { useState } from 'react';


const MainNav = () => {
  const [showLinks, setShowLinks] = useState(false)

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} alt="logo" />
          <button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>

        <div className='links-container show-container'>
          <ul className='links'>
            {links.map((link) => {
              const { id, url, text, icon } = link
              return (
                <li key={id}>
                  <a href={url}>{icon} {text}</a>
                </li>
              )
            })}
          </ul>
        </div>


      </div>
    </nav>
  )
}
const nav = styled.nav`
   height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-rust-1);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    
  }
`
export default MainNav



import React from 'react'
import styled from 'styled-components'
function AdminPanel() {
    return (

        <nav>
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <a className='nav-link' href="/adminReviews">Admin Reviews</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href="/adminMovies">Admin Movies</a>
                </li>

            </ul>
        </nav>

    )
}
const nav = styled.nav`
 
  display: flex;
  align-items: left;
  justify-content: left;
 
`
export default AdminPanel
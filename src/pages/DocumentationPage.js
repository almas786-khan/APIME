import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DocumentationPage = () => {
  return (
    <Wrapper className='page-100'>
      <section>

        <h3>Page Under Construction. Please check back later.</h3>
        <Link to='/' className='btn'>
          back home
        </Link>
      </section>

    </Wrapper>
  )
}
const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
    color: var(--clr-rust-1);
  }
`

export default DocumentationPage
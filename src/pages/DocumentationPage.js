import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';

const DocumentationPage = ({ use, setUse }) => {

  useEffect(() => {
    const initializePage = async () => {
      try {
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
    <Wrapper className='page-100'>

      <div class="container">
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="heading-1">
              <h5 class="mb-0">
                <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                  Movie
                </a>
              </h5>
            </div>
            <div id="collapse-1" class="collapse show" data-parent="#accordion" aria-labelledby="heading-1">
              <div class="card-body">

                <div id="accordion-1">
                  <div class="card">
                    <div class="card-header" id="heading-1-1">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-1" aria-expanded="false" aria-controls="collapse-1-1">
                  Item 1 > 1
                        </a>
                      </h5>
                    </div>
                    <div id="collapse-1-1" class="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-1">
                      <div class="card-body">
Text 1 > 2


                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="heading-1-2">
                      <h5 class="mb-0">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-1-2" aria-expanded="false" aria-controls="collapse-1-2">
                  Item 1 > 2
                        </a>
                      </h5>
                    </div>
                    <div id="collapse-1-2" class="collapse" data-parent="#accordion-1" aria-labelledby="heading-1-2">
                      <div class="card-body">
                Text 1 > 2
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="heading-2">
              <h5 class="mb-0">
                <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                  Review
                </a>
              </h5>
            </div>
            <div id="collapse-2" class="collapse" data-parent="#accordion" aria-labelledby="heading-2">
              <div class="card-body">
                Text 2
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="heading-3">
              <h5 class="mb-0">
                <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                  Watchlist
                </a>
              </h5>
            </div>
            <div id="collapse-3" class="collapse" data-parent="#accordion" aria-labelledby="heading-3">
              <div class="card-body">
                Text 3
              </div>
            </div>
          </div>
        </div>
      </div>


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
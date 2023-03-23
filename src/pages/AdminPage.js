import axios from 'axios'
import React, { useRef, useEffect, useState } from 'react'
import Review from '../components/Review'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import AdminMoviesPage from './AdminMoviesPage'

const AdminPage = ({ use, setUse }) => {
    const [reviews, setReviews] = useState([])
    const [toggle, setToggle] = useState(true);
    const [active, setActive] = useState(false);
    const [value, setValue] = useState('');
    const [url, setUrl] = useState()
    const hasMountedRefs = useRef([]);
    const url1 = '/apime/reviews'

    useEffect(() => {
        const hasMounted = hasMountedRefs.current[0];
        if (hasMounted) {
            const setRequest = async () => {
                try {
                    const { data: { reviews } } = await axios.get(url1)
                    setReviews(reviews)
                }
                catch (error) {
                    console.log(error)
                }
            }
            setRequest();
        }
        else {
            hasMountedRefs.current[0] = true;
        }
    }, [value])


    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data: { reviews } } = await axios.get(`apime/reviews/movie/${value}`)
            setReviews(reviews);
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('homepage user: ' + use)

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
        <Wrapper >
            <div className='section'>
                <div className="container" >
                    <div className="row">
                        <div className="col-sm-1">
                            <button
                                className="btn btn-primary float-right"
                                onClick={() => setToggle(!toggle)}>
                                {toggle ? 'Go to Movies' : 'Go to Reviews'}
                            </button>
                        </div>

                        <div className="col-sm-9">


                            {
                                toggle && (

                                    <ul >
                                        <li>
                                            <form onSubmit={handleSearch}>

                                                <input type='text'
                                                    className='search-input'
                                                    placeholder='Search Review by Movie Title'
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                />

                                                <br />
                                                <input type='submit' value='Submit' className='submit-btn' />
                                            </form>
                                        </li>
                                        <br />
                                        <li>
                                            {reviews.length < 1 ? <h2>No Reviews Found for searched movie</h2> :
                                                <Review reviews={reviews}></Review>}


                                        </li>
                                    </ul>
                                )
                            }

                            {!toggle
                                && (
                                    <ul >
                                        <li>
                                            <AdminMoviesPage />
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.section`
.search-input {
    width: 100%;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    padding: 0.25rem 0.5rem;
    margin-top: 1rem;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
 .submit-btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-01);
    color: var(--clr-white);
    
}`
export default AdminPage;
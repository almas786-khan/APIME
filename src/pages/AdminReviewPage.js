import axios from 'axios'
import React, { useRef, useEffect, useState } from 'react'
import Review from '../components/Review'
import styled from 'styled-components'
import AdminPanel from '../components/AdminPanel';
import { useNavigate } from 'react-router-dom'

const AdminPage = ({ use, setUse }) => {
    const [reviews, setReviews] = useState([])
    const [toggle, setToggle] = useState(true);
    const [active, setActive] = useState(false);
    const [value, setValue] = useState('');
    const [url, setUrl] = useState()
    const hasMountedRefs = useRef([]);
    const url1 = '/apime/reviews'
    const navigate = useNavigate();
    useEffect(() => {
        const hasMounted = hasMountedRefs.current[0];
        if (hasMounted) {
            const setRequest = async () => {
                try {
                    const { data: { reviews } } = await axios.get(url1)
                    setReviews(reviews)
                }
                catch (error) {
                    console.log("hello admin review error")
                    console.log(error.response.status)
                    console.log(error.response.data.msg)
                    navigate('/error', { state: { error: error.response.data.msg, code: error.response.status } })

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
                        <div className="col-sm-2">
                            <AdminPanel />

                        </div>
                        <div className="col-sm-9">
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
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.section`
background: var(--clr-primary-00);
.search-input {
    width: 100%;
    background: var(--clr-primary-02);
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
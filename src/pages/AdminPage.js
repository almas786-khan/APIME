import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Review from '../components/Review'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import AdminMoviesPage from './AdminMoviesPage'
const AdminPage = ({ use, setUse }) => {
    const [reviews, setReviews] = useState([])
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const setRequest = async () => {
            try {
                const { data: { reviews } } = await axios.get('/apime/reviews')
                setReviews(reviews)
            }
            catch (error) {
                console.log(error)
            }
        }
        setRequest();


    }, [])


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
                        <div className="col-sm-2">
                            <Button
                                variant="primary float-right" onClick={() => setToggle(!toggle)}>
                                Go to Movies Page
                            </Button>
                            {/* <button className='submit-btn' onClick={() => setToggle(!toggle)}>Go to Movies Page</button> */}
                        </div>
                        <div className="col-sm-9">

                            {
                                toggle && (
                                    <ul >
                                        <li>
                                            <Review reviews={reviews}></Review>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
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
        </Wrapper>
    );
}
const Wrapper = styled.section`
 .submit-btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-01);
    color: var(--clr-white);
    
}`
export default AdminPage;
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Review from '../components/Review'
import Sidebar from '../components/Sidebar'
const AdminPage = ({ use, setUse }) => {
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        const setRequest = async () => {
            try {
                const { data: { reviews } } = await axios.get('apime/reviews')
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
        <div class="container" >
            <div class="row">
                <div class="col-sm-4">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">View All Reviews</a>
                        </li>

                    </ul>

                </div>
                <div class="col-sm-8">
                    <h1>Admin Page</h1>
                    <p>Only accessible by admins.</p>
                    {reviews.length < 1 ? <h3>Sorry, no reviews matched your search.</h3> :
                        reviews.map(mv => (
                            <Review key={mv._id}{...mv}>

                            </Review>
                        ))
                    }
                </div>
            </div>
        </div>


    );
}
export default AdminPage;
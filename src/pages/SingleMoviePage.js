import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Stars from '../components/Stars';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
//import Pagination from '../components/Pagination';



const SingleMoviePage = ({ use, setUse }) => {

    const { _id } = useParams();
    const [movie, setMovie] = useState([]);
    const [rating, setRating] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(3);
    const url = `/apime/movies/${_id}`;

    //get current reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handleSubmitRatingReview = (ratingValue, reviewText) => {
        // Submit the rating and review to the server
        console.log(`Submitting rating: ${ratingValue}, review: ${reviewText}`);
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchData = async () => {
        try {

            const { data: { movie, reviews } } = await axios.get(url)
            setMovie(movie)
            //console.log(movie)
            setReviews(reviews)
            const reviewRatings = reviews.map(review => review.reviewRating);
            const averageRating = Math.ceil(reviewRatings.reduce((acc, curr) => acc + curr, 0) / reviews.length)
            setRating(averageRating)
            //console.log(averageRating)
            //console.log(reviews)
            const data = await axios.get('/apime/user/userCheck')
            setUse(data.data.user.username)
        }
        catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className='container'>
                <div className='title mt-3'>
                    <h2 role='heading' aria-level='1' >Single Movie page</h2>
                    <div className='underline'></div>
                    <Link to='/movies'>back to movies</Link></div>
                <div className='section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <h2>{movie.title}</h2>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-md-4'>
                                <img src={movie.image}></img>
                            </div>
                            <div className='col-md-auto' style={{ fontSize: 20 }}>
                                <div>
                                    <Stars rating={rating} />
                                </div>
                                <p>Category: {movie.category}</p>
                                <p>Year Released: {movie.yearReleased}</p>
                                <p>Director: {movie.director}</p>
                                <p>Description: <br />{movie.description}</p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className='container'>
                            <h3 className='text-center'>Reviews and Ratings</h3>
                            <div className='d-flex'>
                                <p className='numOfReviews font-weight-bold'>({reviews.length}) Reviews</p>
                                <AddReview onSubmit={handleSubmitRatingReview} />
                            </div>
                            <hr />
                            <Reviews reviews={currentReviews} />
                            {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
                        </div>


                    </div>

                </div>
            </div>
        </>


    )
};


export default SingleMoviePage;

/* import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components'



const SingleMoviePage = () => {
    const [movie, setMovies] = useState([])
    const { _id } = useParams();


    const url = `/apime/movies/${_id}`;
    const fetchData = async () => {
        try {

            const { data: { movie } } = await axios.get(url)
            setMovies(movie)
            console.log(movie)


        }
        catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Wrapper className='section'>
                <div className='title'>
                    <h2>Single Movie page</h2>
                    <div className='underline'></div>
                    <Link to='/movies'>back to movies</Link></div>
                <div className='section section-center page'>

                    <div className='product-center'>
                        {[movie].map(mv => (
                            <ul key={mv._id}>
                                <section className='content'>
                                    <h2>{mv.title}</h2>

                                    <p>{mv.category}</p>
                                    <p>{mv.director}</p>
                                    <p>{mv.yearReleased}</p>
                                    <img src={mv.image}></img>
                                </section>
                            </ul>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </>


    )
};

const Wrapper = styled.section`
  background: var(--clr-primary-00);
 .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .title{
    color :var(--clr-primary-01)
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }
`

export default SingleMoviePage; */
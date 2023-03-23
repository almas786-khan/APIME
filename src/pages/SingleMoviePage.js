import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
//import useSWR from 'swr';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Stars from '../components/Stars';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import Pagination from '../components/Pagination';

const SingleMoviePage = ({ use, setUse }) => {

    const { _id } = useParams();
    const errRef = useRef();
    const [movie, setMovie] = useState([]);
    const [rating, setRating] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(2);
    const [openAddReview, setOpenAddReview] = useState(false);
    const url = `/apime/movies/${_id}`;
    const [sample, setSample] = useState('');

    //get current reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);


    const handleOpenAddModal = () => {
        setOpenAddReview(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddReview(false);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
  

    const fetchData = useCallback(async () => {
        try {
            const { data: { movie, reviewCount, reviews } } = await axios.get(url)
            const user = await axios.get('/apime/user/userCheck')

            setMovie(movie)
            setRating(parseFloat(movie.movieRating).toFixed(2))
            setReviews(reviews)
            setTotalReviews(reviewCount)
            setUse(user.data.user.username)
        }
        catch (error) {
            console.log(error.response);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [rating, reviews]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {

    //             const { data: { movie, reviewCount,reviews } } = await axios.get(url)
    //             const user = await axios.get('/apime/user/userCheck')

    //                 setMovie(movie)
    //                 console.log(movie.movieRating)
    //                 setRating(movie.movieRating)
    //                 setReviews(reviews)
    //                 setTotalReviews(reviewCount)
    //                 setUse(user.data.user.username)


    //         }
    //         catch (error) {
    //             console.log(error.response);
    //         }
    //     };
    //     fetchData();

    // },[]);
    // useEffect(() => {
    //     const updatedData = async () => {
    //       try {
    //         const { data: { movie, reviewCount, reviews } } = await axios.get(url)
    //         setRating(movie.movieRating)
    //         setReviews(reviews)
    //         setTotalReviews(reviewCount)
    //       }
    //       catch (error) {
    //         console.log(error.response);
    //       }
    //     };
    //     updatedData();
    //   }, [rating, reviews]);


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
                                <p>{rating} / 5 Average Rating</p>
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
                                <p className='numOfReviews font-weight-bold'>({totalReviews}) Reviews</p>
                                <button
                                    className='btn btn-primary float-right' onClick={handleOpenAddModal}>
                                    Add a Review
                                </button>

                                {openAddReview && <AddReview movieId={_id} onClose={handleCloseAddModal} />}
                            </div>
                            <hr />
                            <Reviews reviews={currentReviews} />
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>


                    </div>

                </div>
            </div>
        </>


    )
};


export default SingleMoviePage;
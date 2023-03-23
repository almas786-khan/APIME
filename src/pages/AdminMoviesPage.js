import { Button, Form, Modal } from 'react-bootstrap';
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { BiTrash, BiPencil } from "react-icons/bi";
import styled from 'styled-components'
import AddMovie from '../components/AddMovie'
import swal from 'sweetalert';
import ConfirmBox from '../components/ConfirmBox';
import EditMovie from '../components/EditMovie';
import DetailMovie from '../components/DetailMovie';
import EdiMovie from '../components/EdiMovie';

function AdminMoviesPage() {
    const [movies, setMovies] = useState([])
    const [value, setValue] = useState('');
    const [sortValue, setSortValue] = useState('')
    const [filter, setFilter] = useState('')
    const [open, setOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [openAddMovie, setOpenAddMovie] = useState(false);
    const [openEditMovie, setOpenEditMovie] = useState(false);
    const url1 = '/apime/movies'
    const [fullUrl, setFullUrl] = useState()
    const hasMountedRefs = useRef([]);

    useEffect(() => {
        const hasMounted = hasMountedRefs.current[0];
        if (hasMounted) {
            const initializePage = async () => {
                try {
                    const { data: { movies } } = await axios.get(url1)
                    setMovies(movies)
                }
                catch (error) {
                    console.log(error)
                }
            }
            initializePage();
        }
        else {
            hasMountedRefs.current[0] = true;
        }
    }, [])

    useEffect(() => {
        const hasMounted = hasMountedRefs.current[1];
        if (hasMounted) {
            const setRequest = async () => {
                setFullUrl(`/apime/movies?title=${value}&category=${filter}&sort=${sortValue}`)
            }

            setRequest();
        }
        else {
            hasMountedRefs.current[1] = true;
        }

    }, [value, filter, sortValue])

    const clearFilter = async () => {
        setValue("");
        setFilter("");
        setSortValue("");
        try {
            const { data: { movies } } = await axios.get(url1)
            setMovies(movies);

        }
        catch (error) {
            console.log(error)
        }

    }
    const handleSearch = async (e) => {

        e.preventDefault();
        try {
            const { data: { movies } } = await axios.get(fullUrl)
            setMovies(movies);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleOpenAddModal = () => {
        setOpenAddMovie(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddMovie(false);
    };

    const handleOpenEditModal = () => {
        setOpenEditMovie(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditMovie(false);
    };

    const updateMovie = async (_id, title, yearReleased, director, description, category) => {
        try {
            console.log("this is id " + _id);
            console.log("this is title " + title);
            console.log("this is yearReleased " + yearReleased);
            console.log("this is director " + director);
            console.log("this is description " + description);
            console.log("this is category " + category);
            const res = await axios.put(`/apime/movies/${_id}`, {
                title: title, yearReleased: yearReleased,
                director: director, description: description, category: category
            })
            swal({
                title: "Success!",
                text: res.data.msg,
                icon: "success",
                button: "OK!",
            }).then(function () {
                window.location.reload(false);
            });
        }
        catch (error) {
            console.log(error);
        }

    }

    function openDelete(movie) {
        setOpen(true);
        setDeleteData(movie);

    }
    function handleDelete() {

        const res = axios.delete(`/apime/movies/${deleteData?._id}`);
        setOpen(false);
        window.location.reload(false);

    }

    const handleSubmitMovie = async (event, title, image, yearReleased, director, description, category) => {
        try {
            event.preventDefault();
            const formData = new FormData();
            formData.append('movieImage', image);
            const { data: { url, msg } } = await axios.post('/apime/movies/uploadMovieImage', formData);
            console.log("this is msg " + msg);
            console.log("this is url " + url);
            const res = await axios.post('/apime/movies', {
                title: title, image: url, yearReleased: yearReleased,
                director: director, description: description, category: category
            })
            console.log(res);
            //setOpen(false);
        }
        catch (error) {

            console.log("Error: " + error.response.data.msg);
        }
    }
    return (
        <Wrapper>
            {/* <div className='container'> */}

            <div className='row'>
                <div className='col-sm-3'>
                    <button
                        className='btn btn-primary float-center' onClick={handleOpenAddModal}>
                        Add a Movie
                    </button>

                    {/* <AddMovie onSubmit={handleSubmitMovie} /> */}
                    {openAddMovie && <AddMovie onClose={handleCloseAddModal} />}


                    <form onSubmit={handleSearch}>
                        <input type='text'
                            className='search-input'
                            placeholder='Search Movie'
                            value={value}
                            onChange={(e) => setValue(e.target.value)} />
                        <br />
                        <div>
                            <label htmlFor='filter'>Category</label>
                            <select
                                name='filter' id='filter' className='form-control'
                                onChange={(e) => setFilter(e.target.value)} value={filter}
                            >
                                <option value=''>All</option>
                                <option value='Drama'>Drama</option>
                                <option value='Action'>Action</option>
                                <option value='Adventure'>Adventure</option>
                                <option value='Fantasy'>Fantasy</option>
                                <option value='Horror'>Horror</option>
                                <option value='Mystery'>Mystery</option>
                                <option value='Romance'>Romance</option>
                                <option value='Sci-fi'>Sci-fi</option>
                                <option value='Thriller'>Thriller</option>
                            </select>
                        </div>

                        <div >
                            <label htmlFor='sort'>Sort by</label>
                            <select
                                name='sort' id='sort' className='form-control'
                                onChange={(e) => setSortValue(e.target.value)} value={sortValue}
                            >
                                <option value='title'>title (a - z)</option>
                                <option value='-title'>title (z - a)</option>
                            </select>
                        </div>
                        <br />
                        <input type='submit' value='Submit' className='submit-btn' />
                        <br />
                        <button type='button' className='clear-btn' onClick={clearFilter}>
                            Clear filters
                        </button>
                        <br />
                    </form>
                </div>

                <div className="col-sm-9">
                    <table className='table table-striped'>
                        <thead >
                            <tr>
                                <th>Title</th>
                                <th>Rating</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.length < 1 && <h3>No movie found</h3>}
                            {movies.map(movie => (
                                <tr key={movie._id} >

                                    <td>{movie.title}</td>
                                    <td>{movie.movieRating}</td>
                                    <td><img src={movie.image} alt={movie.title} /></td>
                                    <td></td>
                                    <td></td>
                                    <td>

                                        <form>
                                            <input type='hidden' name='id' value={movie._id} />
                                            <button className='btn' id={movie._id} type='button' onClick={() => openDelete(movie)}>Delete</button>
                                        </form>
                                    </td><td>

                                        {/* working without validations */}
                                        {/* <form>
                                            <EditMovie _id={movie._id}
                                                updateMovie={updateMovie}
                                            />
                                        </form> */}

                                        {/* not working with validations */}
                                        <button
                                            className='btn btn-primary float-right' onClick={handleOpenEditModal}>
                                            Edit
                                        </button>
                                        {openEditMovie &&
                                            <EdiMovie _id={movie._id}
                                                onClose={handleCloseEditModal} />
                                        }


                                    </td>
                                    <td>
                                        <form>
                                            {/* <button id={movie._id} className='btn' type='button' >Details</button> */}
                                            <DetailMovie _id={movie._id}

                                            />
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ConfirmBox open={open}
                    closeDialog={() => setOpen(false)}
                    deleteFunction={handleDelete}
                    deleteId="movie"
                />
            </div>
            {/* </div> */}

        </Wrapper >

    )
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
.btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-05);
    color: var(--clr-white);
  }
  .submit-btn {
     display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    background: var(--clr-primary-01);
    color: var(--clr-white);
    
    
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
img{
    height: 120px;
    width: 150px;
}
`
export default AdminMoviesPage;
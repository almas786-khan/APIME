import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiTrash, BiPencil } from "react-icons/bi";
import styled from 'styled-components'
import AddMovie from '../components/AddMovie'
import swal from 'sweetalert';
import ConfirmBox from '../components/ConfirmBox';
import EditMovie from '../components/EditMovie';
import DetailMovie from '../components/DetailMovie';

function AdminMoviesPage() {
    const [movies, setMovies] = useState([])
    const [open, setOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const url = '/apime/movies'

    useEffect(() => {
        const initializePage = async () => {
            try {
                const { data: { movies } } = await axios.get(url)
                setMovies(movies)

            }
            catch (error) {
                console.log(error)
            }
        }

        initializePage();


    }, [])

    const updateMovie = async (_id, title, yearReleased, director, description, category) => {
        try {
            const res = await axios.put(`/apime/movies/${_id}`, {
                title: title, yearReleased: yearReleased,
                director: director, description: description, category: category
            })
            swal({
                title: "Success!",
                text: res.data.msg,
                icon: "success",
                button: "OK!",
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

    const handleSubmitMovie = async (title, yearReleased, director, description, category) => {
        try {
            const res = await axios.post('/apime/movies', {
                title: title, yearReleased: yearReleased,
                director: director, description: description, category: category
            })
            setOpen(false);
        }
        catch (error) {
            console.log(error);
        }
        //window.location.reload(false);
    }
    return (
        <Wrapper>
            <div className='container'>
                <br />
                <div className='row'>
                    <div className='col-sm-2'>
                        <AddMovie onSubmit={handleSubmitMovie} />
                    </div>
                    <div className="col-xl-auto">
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
                                {movies.map(movie => (
                                    <tr key={movie._id} >

                                        <td>{movie.title}</td>
                                        <td>{movie.movieRating}</td>
                                        <td><img src={movie.image} alt={movie.title} /></td>
                                        <td></td>
                                        <td></td>
                                        <td><form>
                                            <input type='hidden' name='id' value={movie._id} />
                                            <button className='btn' id={movie._id} type='button' onClick={() => openDelete(movie)}>Delete</button>
                                        </form>
                                        </td><td>
                                            <form>
                                                <EditMovie _id={movie._id}
                                                    title={movie.title}
                                                    description={movie.description}
                                                    yearReleased={movie.yearReleased}
                                                    director={movie.director}
                                                    category={movie.category}
                                                    updateMovie={updateMovie}
                                                />
                                            </form>

                                        </td>
                                        <td>
                                            <form>
                                                {/* <button id={movie._id} className='btn' type='button' >Details</button> */}
                                                <DetailMovie _id={movie._id}
                                                    title={movie.title}
                                                    description={movie.description}
                                                    yearReleased={movie.yearReleased}
                                                    director={movie.director}
                                                    category={movie.category}
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
            </div>

        </Wrapper >

    )
}
const Wrapper = styled.article`
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
img{
    height: 120px;
    width: 150px;
}
`
export default AdminMoviesPage;
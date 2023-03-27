import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import GreenCheck from '../assets/green-checkmark.png'

function EdiMovie({ movieId, onClose, onSubmit }) {

    const errRef = useRef();
    const [title, setTitle] = useState("");
    const [yearReleased, setYearReleased] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [showModal, setShowModal] = useState(false);



    const handleClose = () => {
        setShowModal(false)
        setSuccess(false)
        onClose();
    };

    const handleHide = () => {
        console.log('handle hide')
        setShowModal(false)
        setSuccess(false)
      }

    useEffect(() => {
        setErrMsg('');
    }, [title, yearReleased, director, description, category]);

    useEffect(() => {

        const getMovie = async () => {

            try {
                const { data: { movie } } = await axios.get(`/apime/movies/${movieId}`);

                setTitle(movie.title);
                setYearReleased(movie.yearReleased);
                setDirector(movie.director);
                setDescription(movie.description);
                setCategory(movie.category);
            }
            catch (error) {
                console.log(error);
            }
        }

        getMovie();
    }, [movieId]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`/apime/movies/${movieId}`, {
                title: title, yearReleased: yearReleased,
                director: director, description: description, category: category
            })
            console.log(res);
            setSuccess(true);
            setShowModal(true);
            onSubmit(event)
        }
        catch (error) {
            console.log(error);
            setErrMsg(error.response.data.msg);
        }

    }

    return (
        <>
            {success ? (
                <Modal show={showModal} onClose={handleHide} aria-labelledby="contained-modal-title-vcenter" centered>

                    <Button variant="close ml-auto mr-2 mt-2" onClick={() => setShowModal(false)}>&times;</Button>

                    <Modal.Body className='mx-auto text-center'>
                        <img src={GreenCheck} alt='green check' />
                        <Modal.Title>Success!</Modal.Title>
                        <p>Your movie has been updated successfully.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button role='close button' variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <Modal show={true} onHide={handleClose} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Update Movie</Modal.Title>
                        <Button variant="btn-close" onClick={handleClose}>&times;
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='updateMovie' onSubmit={handleUpdate}>

                            <br />
                            <Form.Group className="mb-3" >
                                <Form.Label>Movie Title</Form.Label>
                                <Form.Control type="text"
                                    required
                                    placeholder="Enter movie title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type movie title.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="yearReleased">
                                <Form.Label>Year Released</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter year released"
                                    value={yearReleased}
                                    onChange={(event) => setYearReleased(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type year released.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="movieDirector">
                                <Form.Label>Movie Director</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Enter movie director"
                                    value={director}
                                    onChange={(event) => setDirector(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type movie director.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Movie Description</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="Enter movie description"
                                    required
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)} />
                                <Form.Control.Feedback type="invalid">
                                    Please type movie description.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Movie Category</Form.Label>
                                <Form.Control as="select" id='category' name='category' aria-label="Default select example"
                                    required
                                    value={category} onChange={(event) => setCategory(event.target.value)}>
                                    <option value=''>Choose...</option>
                                    <option value='Drama'>Drama</option>
                                    <option value='Action'>Action</option>
                                    <option value='Adventure'>Adventure</option>
                                    <option value='Fantasy'>Fantasy</option>
                                    <option value='Horror'>Horror</option>
                                    <option value='Mystery'>Mystery</option>
                                    <option value='Romance'>Romance</option>
                                    <option value='Sci-fi'>Sci-fi</option>
                                    <option value='Thriller'>Thriller</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select movie category.
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <button className='btn btn-primary' type="submit" form="updateMovie">
                            Update
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
}

export default EdiMovie;
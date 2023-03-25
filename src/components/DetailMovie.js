import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';

function DetailMovie({ _id, onClose }) {
    const [title, setTitle] = useState("");
    const [yearReleased, setYearReleased] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");


    const [show, setShow] = useState(false);

    const handleClose = () => {
        onClose();
    };
    const handleShow = () => setShow(true);
    useEffect(() => {
        const getMovie = async () => {

            try {
                const { data: { movie } } = await axios.get(`/apime/movies/${_id}`);
                //console.log(movie);
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
    }, [_id]);
    return (
        <>
            {/* <Button
                variant="primary float-right" onClick={handleShow}>
                DETAILS
            </Button> */}

            <Modal
                show={true}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header>
                    <Modal.Title>Movie Details</Modal.Title>
                    <Button variant="btn-close" onClick={handleClose}>&times;
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form id='detailMovie'>

                        <br />
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text"
                                disabled

                                value={title}
                            />

                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="yearReleased">
                            <Form.Label>Year Released</Form.Label>
                            <Form.Control
                                disabled
                                type="text"

                                value={yearReleased}
                            />

                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="movieDirector">
                            <Form.Label>Movie Director</Form.Label>
                            <Form.Control
                                type="text"
                                disabled

                                value={director}
                            />

                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Movie Description</Form.Label>
                            <Form.Control as="textarea" rows={4}
                                disabled
                                value={description}
                            />

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Category</Form.Label>
                            <Form.Control as="select" id='category' name='category' aria-label="Default select example"
                                disabled
                                value={category} >
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

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailMovie;
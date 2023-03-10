import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function AddMovie({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [yearReleased, setYearReleased] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        //submit to
        onSubmit(title, yearReleased, director, description, category)

    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="primary float-right" onClick={handleShow}>
                Add a Movie
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add a Movie</Modal.Title>
                    <Button variant="btn-close" onClick={handleClose}>╳
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form id='addMovie'>

                        <br />
                        <Form.Group className="mb-3" controlId="movieTitle">
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
                        <Form.Group className="mb-3" controlId="movieTextarea">
                            <Form.Label>Movie Description</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Enter movie description"
                                required
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please type movie description.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="movieCategory">
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <button className='btn btn-primary' type="submit" validated={validated} onClick={handleSubmit} form="addMovie">
                        Add
                    </button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AddMovie;

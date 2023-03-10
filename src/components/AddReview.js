import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
function AddReview({ onSubmit }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        //submit to
        onSubmit(rating, comment)

    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="primary float-right" onClick={handleShow}>
                Add a Review
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add a Review</Modal.Title>
                    <Button variant="btn-close" onClick={handleClose}>╳
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form id='writeReview'>
                        <div className="star-rating text-center">
                            {[1, 2, 3, 4, 5].map((value) => {
                                return (
                                    <span
                                        key={value}
                                        className={value <= (hover || rating) ? "on" : "off"}
                                        onClick={() => setRating(value)}
                                        onMouseEnter={() => setHover(value)}
                                        onMouseLeave={() => setHover(rating)}
                                    >
                                        <FaStar size={28} />
                                    </span>

                                );
                            })}
                        </div>
                        <br />
                        <Form.Group
                            className="mb-3"
                            controlId="reviewTextarea"
                        >
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="write review here"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <button className='btn btn-primary' type="submit" onClick={handleSubmit} form="writeReview">
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AddReview;

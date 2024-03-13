import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Project = () => {
    // State variables to store project title and description
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log('Project title:', title);
        console.log('Project description:', description);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projectTitle">
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="projectDescription">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            {/*<Button variant="primary" type="submit">*/}
            {/*    Submit*/}
            {/*</Button>*/}
        </Form>
    );
};

export default Project;

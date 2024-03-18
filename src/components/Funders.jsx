import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Funders = () => {
    // Prepopulated dropdown options for funders' IDs and granters' IDs
    const funderIds = ['Funder ID 123']; // Add more options as needed
    const funderTitle = ['Funder One']; // Add more options as needed
    const granterIds = ['Granter ID 123']; // Add more options as needed
    const granterTitle = ['Granter One']; // Add more options as needed

    // Function to handle adding a new funder
    const handleAddFunder = () => {
        // Implement the logic to add a new funder here
    };

    return (
        <div>
            {funderIds.map((funderId, index) => (
                <div key={index}>
                    {/* Render dropdowns for funder ID and granter ID */}
                    <Form.Label className="m-2">Funder ID</Form.Label>
                    <Form.Select value={funderId} onChange={(e) => {/* Handle change */}} className="m-3">
                        {funderIds.map((id, idx) => (
                            <option key={idx} value={id}>{id}</option>
                        ))}
                    </Form.Select>
                    <Form.Label className="m-2">Granter ID</Form.Label>
                    <Form.Select value={granterIds[index]} onChange={(e) => {/* Handle change */}} className="m-3">
                        {granterIds.map((id, idx) => (
                            <option key={idx} value={id}>{id}</option>
                        ))}
                    </Form.Select>
                </div>
            ))}
            {/* Button to add a new funder */}
            <Button variant="primary" onClick={handleAddFunder}>Add Funder</Button>
        </div>
    );
};

export default Funders;

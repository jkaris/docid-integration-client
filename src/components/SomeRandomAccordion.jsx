import React, { useState } from "react";
import { Accordion, Card, Button, Form, ListGroup } from "react-bootstrap";

const SomeRandomAccordion = () => {
    const [formData, setFormData] = useState("");
    const [records, setRecords] = useState([]);

    const handleInputChange = (e) => {
        setFormData(e.target.value);
    };

    const handleAddRecord = () => {
        if (formData.trim() !== "") {
            setRecords([...records, formData]);
            setFormData("");
        }
    };

    const handleDeleteRecord = (index) => {
        const updatedRecords = [...records];
        updatedRecords.splice(index, 1);
        setRecords(updatedRecords);
    };

    return (
        <>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                Add Record
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formDataInput">
                            <Form.Label>Enter Data:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter data"
                                value={formData}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleAddRecord}>
                            Add
                        </Button>
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    <Card>
        <Card.Header>Added Records</Card.Header>
        <Card.Body>
            <ListGroup>
                {records.map((record, index) => (
                    <ListGroup.Item key={index}>
                        {record}
                        <Button variant="danger" size="sm" onClick={() => handleDeleteRecord(index)}>
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card.Body>
    </Card>
        </>
)
    ;


};

export default SomeRandomAccordion;

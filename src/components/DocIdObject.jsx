import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Container from "react-bootstrap/Container";

const API_URL = import.meta.env.VITE_API_URL;

const DocIdObject = () => {
    const [docId, setDocId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [alreadyHasDocId, setAlreadyHasDocId] = useState(false);
    const [resourceTypes, setResourceTypes] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedResourceType, setSelectedResourceType] = useState(null);

    const generateDocId = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/doi/get-docid-doi`);
            console.log(response);
            setDocId(response.data.docid_doi);
        } catch (error) {
            setError('Error generating DOCID. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (event) => {
        setAlreadyHasDocId(event.target.value === 'true');
        setDocId('');
    };
    const handleInputChange = (event) => {
        setDocId(event.target.value);
    };

    useEffect(() => {
        const fetchResourceTypes = async () => {
            try {
                const response = await axios.get(`${API_URL}/utils/object-types`);
                setResourceTypes(response.data);
            } catch (error) {
                console.error('Error fetching resource types:', error);
            }
        };
        fetchResourceTypes();
    }, []);


    const handleResourceTypeChange = (selectedOption) => {
        const selectedIndex = resourceTypes.findIndex(type => type.id === selectedOption.value);
        console.log('Selected Resource Type Index:', selectedIndex);
        setSelectedResourceType(selectedIndex);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Form className="mb-3">
                        <Form.Check
                            id="radioYes"
                            value={true}
                            checked={alreadyHasDocId}
                            onChange={handleRadioChange}
                        />
                        <Form.Label className="mb-3" htmlFor="radioYes">
                            Already have DOCID
                        </Form.Label>
                        <Form.Check
                            id="radioNo"
                            value={false}
                            checked={!alreadyHasDocId}
                            onChange={handleRadioChange}
                        />
                        <Form.Label className="mb-3" htmlFor="radioNo">
                            Don't have DOCID
                        </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            className="form-control"
                            placeholder="Generated DOCID"
                            value={docId}
                            onChange={handleInputChange}
                            readOnly={!alreadyHasDocId}
                            onKeyUp={(e) => setDocId(e.target.value)}
                        />
                            <Button
                                className="btn btn-primary"
                                type="button"
                                onClick={generateDocId}
                                disabled={loading || alreadyHasDocId}
                            >
                                {loading ? 'Generating...' : 'Generate DOCID'}
                            </Button>
                    </Form>
                    {error && <div className="text-danger">{error}</div>}
                        <Form.Group>
                            <Form.Label><h5>Resource Type</h5></Form.Label>
                            <Select
                                className="mb-3"
                                onChange={handleResourceTypeChange}
                                options={resourceTypes.map(type => ({
                                    value: type.id,
                                    label: type.name
                                }))}
                                placeholder="Select resource type..."
                                required
                            />
                            <Form.Label><h5>Description</h5></Form.Label>
                            <Form.Control required
                                          as="textarea" rows={3}
                                          placeholder="Add a description"
                                          value={description}
                                          onChange={handleDescriptionChange}
                            />
                        </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default DocIdObject;

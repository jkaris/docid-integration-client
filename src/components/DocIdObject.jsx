import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Form} from "react-bootstrap";
import Select from "react-select";

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

            // Send a request to the API endpoint to generate DOCID
            const response = await axios.get(`${API_URL}/doi/get-docid-doi`);
            console.log(response);

            // Assuming the response data contains the generated DOCID
            setDocId(response.data.docid_doi);
        } catch (error) {
            setError('Error generating DOCID. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (event) => {
        setAlreadyHasDocId(event.target.value === 'true');
        setDocId(''); // Clear the DOCID when the radio button changes
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
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="form-check mb-3">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="radioYes"
                            value={true}
                            checked={alreadyHasDocId}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="radioYes">
                            Already have DOCID
                        </label>
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="radioNo"
                            value={false}
                            checked={!alreadyHasDocId}
                            onChange={handleRadioChange}
                        />
                        <label className="form-check-label" htmlFor="radioNo">
                            Don't have DOCID
                        </label>
                    </div>
                    <div className="input-group mb-3">
                        <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Generated DOCID"
                            value={docId}
                            onChange={handleInputChange}
                            readOnly={!alreadyHasDocId}
                            onKeyUp={(e) => setDocId(e.target.value)}
                        />
                        <div className="input-group-append">
                            <Button
                                className="btn btn-primary"
                                type="button"
                                onClick={generateDocId}
                                disabled={loading || alreadyHasDocId}
                            >
                                {loading ? 'Generating...' : 'Generate DOCID'}
                            </Button>
                        </div>
                    </div>
                    {error && <div className="text-danger">{error}</div>}
                    <div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocIdObject;

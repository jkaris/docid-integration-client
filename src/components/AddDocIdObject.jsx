import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const AddDocIdObject = () => {
    const {frmData, updateFormData} = useContext(PublicationFormContext)
    const [docId, setDocId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [alreadyHasDocId, setAlreadyHasDocId] = useState(false);
    const [resourceTypes, setResourceTypes] = useState([]);
    const [docidTitle, setDocidTitle] = useState("");
    const [docidDescription, setDocidDescription] = useState("");
    const [selectedResourceType, setSelectedResourceType] = useState(null);

    const resourceTypeOptions = [
        {
            value: "indigenous knowledge",
            label: "Indigenous Knowledge"
        },
        {
            value: "patent",
            label: "Patent"
        },
        {
            value: "cultural heritage",
            label: "Cultural Heritage"
        },
        {
            value: "project",
            label: "Project"
        },
        {
            value: "funder",
            label: "Funder"
        },
        {
            value: "article",
            label: "Article"
        },
        {
            value: "dataset",
            label: "Dataset"
        },
    ]

    const generateDocId = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await axios.get(`${API_URL}/doi/get-docid-doi`);
            console.log(response);
            setDocId(response.data.docid_doi);
            updateFormData("doc_id", response.data.docid_doi)
        } catch (error) {
            setError("Error generating DOCiD. Please try again. Status: " + error.response.status);
        } finally {
            setLoading(false);
        }
    };

    const handleRadioChange = (event) => {
        setAlreadyHasDocId(event.target.value === "true");
        setDocId("");
    };
    const handleInputChange = (event) => {
        console.log("mtu ameType")
        setDocId(event.target.value);
        updateFormData("doc_id", event.target.value)
    };


    const handleResourceTypeChange = (selectedOption) => {
        const selectedIndex = resourceTypes.findIndex(type => type.id === selectedOption.value);
        setSelectedResourceType(selectedIndex);
        updateFormData("resource_type", selectedOption.value)
    };
    const handleDocidTitleChange = (e) => {
        setDocidTitle(e.target.value);
        updateFormData("title", event.target.value)
    };


    const handleDocidDescriptionChange = (e) => {
        setDocidDescription(e.target.value);
        updateFormData("description", e.target.value)
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
                            id="docid_input"
                            required
                            type="text"
                            className="form-control"
                            placeholder="Generated DOCID"
                            value={docId}
                            // onChange={alreadyHasDocId && handleInputChange}
                            readOnly={!alreadyHasDocId}
                            // onKeyUp={(e) => setDocId(e.target.value)}
                        />
                        <Button
                            className="btn btn-primary"
                            type="button"
                            onClick={generateDocId}
                            disabled={loading || alreadyHasDocId}
                        >
                            {loading ? "Generating..." : "Generate DOCID"}
                        </Button>
                    </Form>
                    {error && <div className="text-danger">{error}</div>}
                    <Form.Group>
                        <Form.Label><h5>Resource Type</h5></Form.Label>
                        <Select
                            className="mb-3"
                            onChange={handleResourceTypeChange}
                            options={resourceTypeOptions.map(type => ({
                                value: type.value,
                                label: type.label
                            }))}
                            placeholder="Select resource type..."
                            required
                            isClearable
                        />
                        <Form.Label><h5>Title</h5></Form.Label>
                        <Form.Control required type="text" placeholder="Add a title" value={docidTitle}
                                      onChange={handleDocidTitleChange} />
                        <Form.Label><h5>Description</h5></Form.Label>
                        <Form.Control required
                                      as="textarea" rows={3}
                                      placeholder="Add a description"
                                      value={docidDescription}
                                      onChange={handleDocidDescriptionChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default AddDocIdObject;

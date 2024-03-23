import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from "react-select";

const Media = () => {
    const [files, setFiles] = useState([]);
    const [metadata, setMetadata] = useState({ title: "", description: "", mediaType: "" });
    const [resourceType, setResourceType] = useState(null);
    const [selectedMediaType, setSelectedMediaType] = useState(null);
    const [selectedIdentifierType, setSelectedIdentifierType] = useState(null);
    const [doi, setDoi] = useState('');
    const [raidDoi, setRaidDoi] = useState('');
    const [dataciteDoi, setdataciteDoi] = useState('');
    const [crossRefDoi, setcrossRefDoi] = useState('');
    const generateDoi = () => {
        const min = 10.1000 / 182;
        const max = 10.9999 / 999;
        const newDoi = min + Math.random() * (max - min);
        setDoi(newDoi.toFixed(5));
    };
    const generateRaidDoi = () => {
        const min = 13.1010 / 1000;
        const max = 13.9999 / 9999;
        const newRaidDoi = min + Math.random() * (max - min);
        setRaidDoi(newRaidDoi.toFixed(5));
    };
    const identifierOptions = [
        {
            value: "ark",
            label: "ARK"
        },
        {
            value: "handle",
            label: "Handle"
        },
    ];

    const mediaOptions = [
        {
            value: "video",
            label: "Video"
        },
        {
            value: "illustration",
            label: "Illustration"
        },
        {
            value: "interview",
            label: "Interview"
        },
        {
            value: "webinar",
            label: "Webinar"
        }
    ];

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles.map(file => ({ file, ...metadata }))]);
    };

    const handleMetadataChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFiles = [...files];
        updatedFiles[index][name] = value;
        setFiles(updatedFiles);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleMediaTypeChange = (selectedOption) => {
        setSelectedMediaType(selectedOption);
    };

    const handleIdentifierTypeChange = (selectedIdentifierType) => {
        setSelectedIdentifierType(selectedIdentifierType);
    };

    const handleGenerateId = async (index) => {
        const { mediaType } = files[index];
        if (mediaType === "patent") {
            console.log("Generating DOI for patent");
        } else if (mediaType === "webinar") {
            console.log("Generating Handles for webinar");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach(({ file, ...metadata }) => {
            formData.append("files", file);
            Object.entries(metadata).forEach(([key, value]) => {
                formData.append(`${file.name}_${key}`, value);
            });
        });
        console.log("FormData:", formData);
    };

    const idSelector = <Select placeholder="Select ID" options={identifierOptions}
                               className="m-3" isDisabled={true} id="idSelector" />;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fileUpload">
                <Form.Label>Upload Files</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileChange} />
            </Form.Group>
            {files.map(({ file, title, description, mediaType }, index) => (
                <div key={index}>
                    <Row className="m-3">
                        <Col>
                            <Form.Group controlId={`fileName_${index}`}>
                                <Form.Label>File Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={file.name}
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`fileTitle_${index}`}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="title"
                                    placeholder="Enter title"
                                    value={title || ""}
                                    onChange={(e) => handleMetadataChange(e, index)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`fileDescription_${index}`}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="description"
                                    placeholder="Enter description"
                                    value={description || ""}
                                    onChange={(e) => handleMetadataChange(e, index)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`fileMediaType_${index}`}>
                                <Form.Label>Media Type</Form.Label>
                                <Select placeholder="Select Media Type" options={mediaOptions}
                                        onChange={(selected) => handleMediaTypeChange(selected, index)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>Identifier</Form.Label>
                            <Select placeholder="Select ID" options={identifierOptions}
                                    className="m-3" id="idSelector"
                                    isDisabled={!selectedMediaType || false}
                                    onChange={(e) => handleIdentifierTypeChange(e, index)} />
                        </Col>
                        <Col>
                            <Form.Label>Identifier</Form.Label>
                            <Button variant="info" size="m" className="m-3" onClick={() => generateDoi(index)}
                                    disabled={!selectedIdentifierType || false}>
                                {selectedIdentifierType ? selectedIdentifierType.label : "Select an ID option"}
                            </Button>

                        </Col>
                        <Col>
                            <Form.Label>Identifier</Form.Label>
                            <Form.Control value={doi} onChange={(e) => handleIdentifierTypeChange(e, index)}
                                          readOnly/></Col>
                        <Col>
                            <Form.Label>Remove</Form.Label>
                            <Button variant="danger" onClick={() => handleRemoveFile(index)} size="sm">X</Button>
                        </Col>
                    </Row>
                </div>
            ))}
        </Form>
    );
};

export default Media;

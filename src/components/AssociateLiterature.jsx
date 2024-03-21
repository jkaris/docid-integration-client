import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from "react-select";

const AssociateLiterature = () => {
    const [files, setFiles] = useState([]);
    const [metadata, setMetadata] = useState({ title: '', description: '', mediaType: '' });

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

    const handleGenerateId = async (index) => {
        const { mediaType } = files[index];
        if (mediaType === 'patent') {
            // Logic to fetch DOI
            console.log('Generating DOI for patent');
        } else if (mediaType === 'webinar') {
            // Logic to fetch Handles
            console.log('Generating Handles for webinar');
        }
        // Add other conditions for different media types if needed
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare data to send to the server
        const formData = new FormData();
        files.forEach(({ file, ...metadata }) => {
            formData.append('files', file);
            Object.entries(metadata).forEach(([key, value]) => {
                formData.append(`${file.name}_${key}`, value);
            });
        });

        // Send formData to the server using Axios or Fetch
        console.log('FormData:', formData);
        // Example: axios.post('/upload', formData);
    };

    const identifierOptions = [
        {
            value: 'doi',
            label: 'DOI'
        },
        {
            value: 'datacite',
            label: 'DataCite'
        },
        {
            value: 'raid',
            label: 'RAID'
        },
        {
            value: 'crossref',
            label: 'CrossRef'
        },
    ]

    const mediaOptions = [
        {
            value: 'interview',
            label: 'Interview'
        },
        {
            value: 'illustration',
            label: 'Illustration'
        },
        {
            value: 'webinar',
            label: 'Webinar'
        },
        {
            value: 'video',
            label: 'Video'
        },
        {
            value: 'article',
            label: 'Article'
        },
    ]

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fileUpload">
                    <Form.Label>Upload Files</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                </Form.Group>
                {files.map(({ file, title, description, mediaType }, index) => (
                    <div key={index}>
                        <Row>
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
                                        value={title || ''}
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
                                        value={description || ''}
                                        onChange={(e) => handleMetadataChange(e, index)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId={`fileMediaType_${index}`}>
                                    <Form.Label>Media Type</Form.Label>
                                    <Select placeholder="Select Media Type" options={mediaOptions} />
                                </Form.Group>
                            </Col>
                            <Col xs="auto">
                                <Select placeholder="Select ID" options={identifierOptions} className="m-3"/>
                            </Col>
                            <Col xs="auto">
                                <Button variant="info" size="sm" className="m-3">Generate ID</Button>
                                <Button variant="danger" onClick={() => handleRemoveFile(index)} size="sm" className="m-3">X</Button>
                            </Col>
                        </Row>
                    </div>
                ))}
            </Form>
        </Container>
    );
};

export default AssociateLiterature;

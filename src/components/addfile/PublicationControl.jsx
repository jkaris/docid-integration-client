import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";

export const PublicationControl = (props) => {
    const { files, setFiles, idx, fileProps } = props;
    const {file} = fileProps;
    const [resourceType, setResourceType] = useState(null);
    const [selectedMediaType, setSelectedMediaType] = useState(null);
    const [selectedIdentifierType, setSelectedIdentifierType] = useState(null);
    const [doi, setDoi] = useState("");
    const [raidDoi, setRaidDoi] = useState("");
    const [dataciteDoi, setdataciteDoi] = useState("");
    const [crossRefDoi, setcrossRefDoi] = useState("");
    const [apiUrl, setApiUrl] = useState("")
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
            value: "doi",
            label: "DOI",
            url: "http://doi"
        },
        {
            value: "datacite",
            label: "DataCite",
            url: "http://"
        },
        {
            value: "raid",
            label: "RAID",
            url: "http://"
        },
        {
            value: "crossref",
            label: "CrossRef",
            url: "http://"
        },
        {
            value: "orcid",
            label: "ORCID",
            url: "http://"
        },
        {
            value: "ark",
            label: "ARK",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "arxiv",
            label: "arXiv",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "bibcode",
            label: "Bibcode",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "crossref_funder_id",
            label: "CrossRef AddFunder ID",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "ean13",
            label: "EAN13",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "eissn",
            label: "EISSN",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "grid",
            label: "GRID",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "handle",
            label: "Handle",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "igsn",
            label: "IGSN",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "isbn",
            label: "ISBN",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "isni",
            label: "ISNI",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "issn",
            label: "ISSN",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "istc",
            label: "ISTC",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "lissn",
            label: "LISSN",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "lsid",
            label: "LSID",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "pmid",
            label: "PMID",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "purl",
            label: "PURL",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "upc",
            label: "UPC",
            isDisabled: true,
            url: "http://"
        },
        {
            value: "url",
            label: "URL",
            isDisabled: true,
            url: "http://"
        }
    ];

    const mediaOptions = [
        {
            value: "article",
            label: "Article"
        },
        {
            value: "book chapter",
            label: "Book Chapter"
        },
        {
            value: "chapter",
            label: "Chapter"
        },
        {
            value: "proceeding",
            label: "Proceeding"
        },
        {
            value: "monograph",
            label: "Monograph"
        },
        {
            value: "preprint",
            label: "Preprint"
        }
    ];

    // const handleFileChange = (e) => {
    //     const selectedFiles = Array.from(e.target.files);
    //     setFiles([...files, ...selectedFiles.map(file => ({ file, ...metadata }))]);
    // };

    // const handleMetadataChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const updatedFiles = [...files];
    //     updatedFiles[index][name] = value;
    //     setFiles(updatedFiles);
    // };

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        window.document.getElementById("selectPubDocs").textContent = `${files.length} Documents`
    };

    const handleMediaTypeChange = (selectedOption) => {
        setSelectedMediaType(selectedOption);
    };

    const handleIdentifierTypeChange = (selectedIdentifierType) => {
        setSelectedIdentifierType(selectedIdentifierType);
        setApiUrl(selectedIdentifierType.url);
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

    return (
        <div>
            <Row className="m-3">
                <Col>
                    <Form.Group>
                        <Form.Label>File Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={file.name}
                            readOnly
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="title"
                            placeholder="Enter title"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="description"
                            placeholder="Enter description"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Publication Type</Form.Label>
                        <Select placeholder="Select AddDocument Type" options={mediaOptions}
                                onChange={(selected) => handleMediaTypeChange(selected)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Label>Identifier</Form.Label>
                    <Select placeholder="Select ID" options={identifierOptions}
                            className="m-3"
                            isDisabled={!selectedMediaType || false}
                            onChange={(e) => handleIdentifierTypeChange(e)} />
                </Col>
                <Col>
                    <Form.Label>Identifier</Form.Label>
                    <Button variant="info" size="m" className="m-3" onClick={() => generateDoi(idx)}
                            disabled={!selectedIdentifierType || false}>
                        {selectedIdentifierType ? selectedIdentifierType.label : "Select an ID option"}
                    </Button>

                </Col>
                <Col>
                    <Form.Label>Identifier</Form.Label>
                    <Form.Control value={doi} onChange={(e) => handleIdentifierTypeChange(e, idx)}
                                  readOnly /></Col>
                <Col>
                    <Form.Label>Remove</Form.Label>
                    <Button variant="danger" onClick={() => handleRemoveFile(idx)} size="sm">X</Button>
                </Col>
            </Row>
        </div>
    );
};

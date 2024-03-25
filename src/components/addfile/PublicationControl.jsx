import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { PublicationFormContext } from "../context/PublicationFormContext.jsx";

export const PublicationControl = (props) => {
    const { frmData, updateFormData } = useContext(PublicationFormContext);
    const { files, setFiles, idx, fileProps, docType } = props;
    const { file } = fileProps;
    // const [resourceType, setResourceType] = useState(null);
    const [selectedMediaType, setSelectedMediaType] = useState(null);
    const [selectedIdentifierType, setSelectedIdentifierType] = useState(null);
    const [doi, setDoi] = useState("");
    const [raidDoi, setRaidDoi] = useState("");
    // const [dataciteDoi, setdataciteDoi] = useState("");
    // const [crossRefDoi, setcrossRefDoi] = useState("");
    const [apiUrl, setApiUrl] = useState("");

    useEffect(() => {
        frmData[docType] = files.map(f => ({ title: f.title, description: f.description, mediaType: f.mediaType }));
        updateFormData(docType, frmData[docType]);
    }, [files]);

    useEffect(() => {
        document.getElementById(`ident_${docType}_${idx}`).value = doi;
    }, [doi]);

    const isPublication = docType === "Publication";
    const generateDoi = () => {
        const min = 10.1000 / 182;
        const max = 10.9999 / 999;
        const newDoi = min + Math.random() * (max - min);
        setDoi(newDoi.toFixed(5));

        const uPubs = [...frmData[docType]];
        uPubs[idx].identifier_value = newDoi.toFixed(5);
        updateFormData(`${docType}`, uPubs);
    };
    const generateRaidDoi = () => {
        const min = 13.1010 / 1000;
        const max = 13.9999 / 9999;
        const newRaidDoi = min + Math.random() * (max - min);
        setRaidDoi(newRaidDoi.toFixed(5));
    };

    const documentIdentifierOptions = [
        {
            value: "ark",
            label: "ARK"
        },
        {
            value: "handle",
            label: "Handle"
        },
    ];

    const publicationIdentifierOptions = [
        {
            value: "doi",
            label: "DOI",
            url: "https://doi.org/api/"
        },
        {
            value: "datacite",
            label: "DataCite",
            url: "https://api.test.datacite.org/"
        },
        {
            value: "raid",
            label: "RAID",
            url: "https://app.test.raid.org.au/"
        },
        {
            value: "crossref",
            label: "CrossRef",
            url: "https://api.crossref.org/"
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

    const publicationOptions = [
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
            value: "literature",
            label: "Literature"
        },
        {
            value: "monograph",
            label: "Monograph"
        },
        {
            value: "proceeding",
            label: "Proceeding"
        },
        {
            value: "preprint",
            label: "Preprint"
        },
        {
            value: "book review",
            label: "Book Review"
        },
        {
            value: "conference abstract",
            label: "Conference Abstract"
        },
        {
            value: "conference paper",
            label: "Conference Paper"
        },
        {
            value: "correction erratum",
            label: "Correction Erratum"
        },
        {
            value: "editorial",
            label: "Editorial"
        },
        {
            value: "letter to editor",
            label: "Letter to Editor"
        },
        {
            value: "other book content",
            label: "Other Book Content"
        },
        {
            value: "other conference content",
            label: "Other Conference Content"
        },
        {
            value: "other journal content",
            label: "Other Journal Content"
        },
        {
            value: "reference work",
            label: "Reference Work"
        },
        {
            value: "research article",
            label: "Research Article"
        },
        {
            value: "research chapter",
            label: "Research Chapter"
        },
        {
            value: "scientific poster",
            label: "Scientific Poster"
        }
    ];

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    const handleMediaTypeChange = (selectedOption) => {
        setSelectedMediaType(selectedOption);
        const uPubs = [...frmData[docType]];
        uPubs[idx].type = selectedOption.value;
        updateFormData(`${docType}`, uPubs);
    };

    const handleIdentifierChange = (selectedIdentifier) => {

        setSelectedIdentifierType(selectedIdentifier);
        setApiUrl(selectedIdentifier.url);

        const uPubs = [...frmData[docType]];
        uPubs[idx].identifier = selectedIdentifier.value;
        updateFormData(`${docType}`, uPubs);

    };

    const handleIdentifierTypeChange = (selectedIdentifierType) => {
        if (isPublication) {
            setSelectedIdentifierType(selectedIdentifierType);
            setApiUrl(selectedIdentifierType.url);

            const uPubs = [...frmData[docType]];
            uPubs[idx].identifier = selectedIdentifierType.value;
            updateFormData(`${docType}`, uPubs);
        } else {
            const uPubs = [...frmData[docType]];
            if (selectedIdentifierType?.target) {
                uPubs[idx].identifier_value = selectedIdentifierType.target.value;
                updateFormData(`${docType}`, uPubs);
            }
        }
    };

    const handleGenerateId = async (index) => {
        const { mediaType } = files[index];
        if (mediaType === "patent") {
            console.log("Generating DOI for patent");
        } else if (mediaType === "webinar") {
            console.log("Generating Handles for webinar");
        }
    };

    return (
        <div>
            <Row className="m-3">
                <Col>
                    <Form.Group>
                        <Form.Label>File Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={fileProps.name}
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
                            placeholder="Enter title"
                            name={`title`}
                            onChange={e => {
                                const uDoc = [...frmData[docType]];
                                uDoc[idx].title = e.target.value;
                                updateFormData(`${docType}`, uDoc);
                            }}
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
                            onChange={e => {
                                const uDoc = [...frmData[docType]];
                                uDoc[idx].description = e.target.value;
                                updateFormData(`${docType}`, uDoc);
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>{docType} Type</Form.Label>
                        <Select placeholder="Select AddDocument Type" options={publicationOptions}
                                onChange={(selected) => handleMediaTypeChange(selected)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Label>Select ID</Form.Label>
                    <Select placeholder="Select ID" options={publicationIdentifierOptions}
                            className="m-3"
                            isDisabled={!selectedMediaType || false}
                            name={`${docType}[${idx}].type`}
                            onChange={(e) => handleIdentifierChange(e)} />
                </Col>
                <Col hidden={!isPublication}>
                    <Form.Label>Generate ID</Form.Label>
                    <Button variant="info" size="m" className="m-3" onClick={() => generateDoi(idx)}
                            disabled={!selectedIdentifierType || false}>
                        {selectedIdentifierType ? selectedIdentifierType.label : "Select an ID option"}
                    </Button>

                </Col>
                <Col>
                    <Form.Label>ID Value</Form.Label>
                    <Form.Control id={`ident_${docType}_${idx}`} type="text"
                                  onChange={(e) => handleIdentifierTypeChange(e)}
                                  readOnly={isPublication} required /></Col>
                <Col>
                    <Row><Form.Label>Remove</Form.Label></Row>
                    <Button variant="danger" onClick={() => handleRemoveFile(idx)} size="sm">X</Button>
                </Col>
            </Row>
        </div>
    );
};

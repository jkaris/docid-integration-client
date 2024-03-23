import React, { useState } from "react";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import { PublicationControl } from "./addfile/PublicationControl.jsx";

const AddPublicationContent = () => {
    const [files, setFiles] = useState([]);
    const [metadata, setMetadata] = useState({ title: "", description: "", mediaType: "" });
    const [docType, setDocType] = useState("publication");
    // const [resourceType, setResourceType] = useState(null);
    // const [selectedMediaType, setSelectedMediaType] = useState(null);
    // const [selectedIdentifierType, setSelectedIdentifierType] = useState(null);
    // const [doi, setDoi] = useState('');
    // const [raidDoi, setRaidDoi] = useState('');
    // const [dataciteDoi, setdataciteDoi] = useState('');
    // const [crossRefDoi, setcrossRefDoi] = useState('');
    // const generateDoi = () => {
    //     const min = 10.1000 / 182;
    //     const max = 10.9999 / 999;
    //     const newDoi = min + Math.random() * (max - min);
    //     setDoi(newDoi.toFixed(5));
    // };
    // const generateRaidDoi = () => {
    //     const min = 13.1010 / 1000;
    //     const max = 13.9999 / 9999;
    //     const newRaidDoi = min + Math.random() * (max - min);
    //     setRaidDoi(newRaidDoi.toFixed(5));
    // };
    // const identifierOptions = [
    //     {
    //         value: "doi",
    //         label: "DOI"
    //     },
    //     {
    //         value: "datacite",
    //         label: "DataCite"
    //     },
    //     {
    //         value: "raid",
    //         label: "RAID"
    //     },
    //     {
    //         value: "crossref",
    //         label: "CrossRef"
    //     },
    //     {
    //         value: "orcid",
    //         label: "ORCID"
    //     },
    //     {
    //         value: "ark",
    //         label: "ARK",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "arxiv",
    //         label: "arXiv",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "bibcode",
    //         label: "Bibcode",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "crossref_funder_id",
    //         label: "CrossRef AddFunder ID",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "ean13",
    //         label: "EAN13",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "eissn",
    //         label: "EISSN",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "grid",
    //         label: "GRID",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "handle",
    //         label: "Handle",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "igsn",
    //         label: "IGSN",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "isbn",
    //         label: "ISBN",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "isni",
    //         label: "ISNI",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "issn",
    //         label: "ISSN",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "istc",
    //         label: "ISTC",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "lissn",
    //         label: "LISSN",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "lsid",
    //         label: "LSID",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "pmid",
    //         label: "PMID",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "purl",
    //         label: "PURL",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "upc",
    //         label: "UPC",
    //         isDisabled: true,
    //     },
    //     {
    //         value: "url",
    //         label: "URL",
    //         isDisabled: true,
    //     }
    // ];
    //
    // const mediaOptions = [
    //     {
    //         value: "article",
    //         label: "Article"
    //     },
    //     {
    //         value: "book chapter",
    //         label: "Book Chapter"
    //     },
    //     {
    //         value: "chapter",
    //         label: "Chapter"
    //     },
    //     {
    //         value: "proceeding",
    //         label: "Proceeding"
    //     },
    //     {
    //         value: "monograph",
    //         label: "Monograph"
    //     },
    //     {
    //         value: "preprint",
    //         label: "Preprint"
    //     }
    // ];
    //
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles.map(file => ({ file, ...metadata }))]);
        window.document.getElementById("selectPubDocs").textContent = `${files.length} Documents`
    };
    //
    // const handleMetadataChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const updatedFiles = [...files];
    //     updatedFiles[index][name] = value;
    //     setFiles(updatedFiles);
    // };
    //
    // const handleRemoveFile = (index) => {
    //     const updatedFiles = [...files];
    //     updatedFiles.splice(index, 1);
    //     setFiles(updatedFiles);
    // };
    //
    // const handleMediaTypeChange = (selectedOption) => {
    //     setSelectedMediaType(selectedOption);
    // };
    //
    // const handleIdentifierTypeChange = (selectedIdentifierType) => {
    //     setSelectedIdentifierType(selectedIdentifierType);
    // };
    //
    // const handleGenerateId = async (index) => {
    //     const { mediaType } = files[index];
    //     if (mediaType === "patent") {
    //         console.log("Generating DOI for patent");
    //     } else if (mediaType === "webinar") {
    //         console.log("Generating Handles for webinar");
    //     }
    // };

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
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Upload Files</Form.Label>
                    <Form.Control id="selectPubDocs" type="file" multiple onChange={handleFileChange} />
                </Form.Group>
                {files.map((fileProps, index) => (
                   <PublicationControl key={index} files={files} setFiles={setFiles} fileProps={fileProps} idx={index} docType={docType}/>
                ))}
            </Form>
    );
};

export default AddPublicationContent;

import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from "react-select";
import { PublicationControl } from "./addfile/PublicationControl.jsx";
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";

const AddDocument = () => {
    // const { frmData, updateFormData } = useContext(PublicationFormContext);
    // fileProps { file, title, description, mediaType }
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
            {files.map((fileProps, index) => (
                <PublicationControl key={index} files={files} setFiles={setFiles} fileProps={fileProps} idx={index} docType={"documents"}/>
            ))}
        </Form>
    );
};

export default AddDocument;

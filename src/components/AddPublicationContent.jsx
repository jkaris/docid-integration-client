import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import { PublicationControl } from "./addfile/PublicationControl.jsx";
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";

const AddPublicationContent = () => {
    const { frmData, ctxFiles, setCtxFiles } = useContext(PublicationFormContext);
    const [files, setFiles] = useState([]);
    const [metadata, setMetadata] = useState({ title: "", description: "", mediaType: "" });
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // setFiles([...files, ...selectedFiles.map(file => ({ file, ...metadata }))]);
        setFiles([...files, ...selectedFiles]);
        // console.log("files zenye ziko", files)
        // window.document.getElementById("selectPubDocs").textContent = `${files.length} Documents`
    };
    useEffect(() => {
        const fl = files.map(data => ({file: data.file}))
        setCtxFiles(prevFiles=>({...prevFiles, ["publications"]: fl}))
    }, [files]);


    useEffect(() => {
        frmData.creators = [];
        frmData.organizations = [];
        frmData.projects = [];
        frmData.funders = [];
    }, []);

    // useEffect(() => {
    //     frmData.publications = files.map(f => ({ title: f.title, description: f.description, mediaType: f.mediaType }));
    //     updateFormData("publications", frmData.publications);
    // }, [files]);
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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     files.forEach(({ file, ...metadata }) => {
    //         formData.append("files", file);
    //         Object.entries(metadata).forEach(([key, value]) => {
    //             formData.append(`${file.name}_${key}`, value);
    //         });
    //     });
    //     console.log("FormData:", formData);
    // };

    return (
        <>
            <Form.Group>
                <Form.Label>Upload Files</Form.Label>
                <Form.Control id="selectPubDocs" type="file" multiple onChange={handleFileChange} />
            </Form.Group>
            {files.map((fileProps, index) => (
                <PublicationControl key={index} files={files} setFiles={setFiles} fileProps={fileProps} idx={index}
                                    docType={"publications"} />
            ))}
        </>
    );
};

export default AddPublicationContent;

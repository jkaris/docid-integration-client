import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { PublicationControl } from "./addfile/PublicationControl.jsx";
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";

const AddPublicationContent = () => {
    const { frmData, ctxFiles, setCtxFiles } = useContext(PublicationFormContext);
    const [files, setFiles] = useState([]);
    const [metadata, setMetadata] = useState({ title: "", description: "", mediaType: "" });
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
    };
    useEffect(() => {
        const fl = files.map(data => ({file: data.file}))
        setCtxFiles(prevFiles=>({...prevFiles, ["Publication"]: fl}))
    }, [files]);


    useEffect(() => {
        frmData.creators = [];
        frmData.organizations = [];
        frmData.projects = [];
        frmData.funders = [];
    }, []);

    return (
        <>
            <Form.Group>
                <Form.Label>Upload Files</Form.Label>
                <Form.Control id="selectPubDocs" type="file" multiple onChange={handleFileChange} />
            </Form.Group>
            {files.map((fileProps, index) => (
                <PublicationControl key={index} files={files} setFiles={setFiles} fileProps={fileProps} idx={index}
                                    docType={"Publication"} />
            ))}
        </>
    );
};

export default AddPublicationContent;

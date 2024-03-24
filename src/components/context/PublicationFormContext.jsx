import React, { createContext, useEffect, useState } from "react";
import Ajv from "ajv";
import schema from "../../assets/schemas/publication.json";
import axios from "axios"; // Import your JSON schema file

const PublicationFormContext = createContext();

const PublicationFormProvider = ({ children }) => {
    const [frmData, setFormData] = useState({});
    const [ctxFiles, setCtxFiles] = useState({});
    const [validationErrors, setValidationErrors] = useState([]);

    // Initialize Ajv for JSON schema validation
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    // useEffect(() => {
    //     console.log("&&&&&&&&&&&&&&&", ctxFiles)
    //     // setFormData((prevFormData) => ({
    //     //     ...prevFormData,
    //     //     [key]: value
    //     // }));
    // }, [ctxFiles]);

    // useEffect(() => {
    //     console.log((frmData));
    // }, [frmData]);

    const updateFormData = (key, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value
        }));
    };

    const [_validated, setValidated] = useState(false);
    const handleFormSubmit = (e) => {
        const form = e.currentTarget;

        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            alert("Fill in all the highlighted required fields");
        }

        // validate json
        const isValid = validate(frmData);
        console.log("form data validation", isValid);
        console.log("the errors", validate.errors);
        // else {
        //     fileUploadRef.current.handleUpload();
        // }

        setValidated(true);
        // e.preventDefault();
        // const formData = new FormData();
        // files.forEach(({ file, ...metadata }) => {
        //     formData.append("files", file);
        //     Object.entries(metadata).forEach(([key, value]) => {
        //         formData.append(`${file.name}_${key}`, value);
        //     });
        // });
        console.log("FormData:", frmData);
        console.log("Files Uploaded:", ctxFiles);

        fetch('http://localhost:5099/save/file-info', {
            method: 'POST',
            body: ctxFiles.documents
        })

        // const submitData = async () => {
        //     const fileData = new FormData();
        //
        //     ctxFiles.documents.forEach((file, index) => {
        //         fileData.append('files', file);
        //     });
        //
        //
        //     const _response = await axios.post('http://localhost:5099/save/file-info', fileData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     // window.location.href = "/list"
        // }
        // submitData()

        // form submission
        const submitData = async () => {
            const _response = await axios.post('http://localhost:5099/save/publish', {
                formData: frmData,
                publisher: 12345
            });
            // window.location.href = "/list"
        }
        submitData()
    };
    // const handleSubmit = async (event) => {
    //     const form = event.currentTarget;
    //
    //     event.preventDefault();
    //     if (form.checkValidity() === false) {
    //         event.stopPropagation();
    //         alert("Fill in all the highlighted required fields")
    //     } else {
    //         fileUploadRef.current.handleUpload();
    //     }
    //
    //     setValidated(true);
    // };

    return (
        <PublicationFormContext.Provider value={{ frmData, updateFormData, validationErrors, handleFormSubmit, ctxFiles, setCtxFiles }}>
            {children}
        </PublicationFormContext.Provider>
    );
};

export { PublicationFormContext, PublicationFormProvider };

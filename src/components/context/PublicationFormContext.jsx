import React, { createContext, useEffect, useState } from "react";
import Ajv from "ajv";
import schema from "../../assets/schemas/publication.json"; // Import your JSON schema file

const PublicationFormContext = createContext();

const PublicationFormProvider = ({ children }) => {
    const [frmData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState([]);

    // Initialize Ajv for JSON schema validation
    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    useEffect(() => {
        // Validate form data whenever it changes
        // const isValid = validate(frmData);
        // if (!isValid) {
        //     setValidationErrors(validate.errors || []);
        // } else {
        //     setValidationErrors([]);
        // }
        console.log(frmData)
    }, [frmData]);

    const updateFormData = (key, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value
        }));
    };

    return (
        <PublicationFormContext.Provider value={{ frmData, updateFormData, validationErrors }}>
            {children}
        </PublicationFormContext.Provider>
    );
};

export { PublicationFormContext, PublicationFormProvider };

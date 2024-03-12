import React, {useRef, useState, useEffect} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import ReusableAccordion from "../components/accordion/MyAccordion.jsx";
import FileUpload from "../components/fileupload/FileUpload.jsx";
import BasicInfo from "../components/basicinformation/BasicInfo.jsx";
import AddOrgCreatorModal from "../components/organization/Organization.jsx";
import axios from "axios";
import AddCreatorModal from "../components/modal/CreatorModal.jsx";

function AddPublication(props) {
    const fileUploadRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState('no');
    const [selectedDate, setSelectedDate] = useState('');
    const [doi, setDOI] = useState('');
    const [placeholderValue, setPlaceholderValue] = useState('');
    const [error, setError] = useState('');
    const [resourceTypes, setResourceTypes] = useState([]);
    const [selectedResourceType, setSelectedResourceType] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        personName: '',
        familyName: '',
        givenName: '',
        identifiers: '',
        affiliations: '',
        roles: '',
        organization: '',
    });
    const [fileId, setFileId] = useState(null);
    useEffect(() => {
        if (fileId !== null || fileId != undefined) {
            const allFormData = {
                doi,
                selectedResourceType,
                title,
                description,
                placeholderValue,
                selectedDate,
                fileId,
                ...formData
            };
            const submitData = async () => {
                const _response = await axios.post('http://localhost:5000/save/basic-info', allFormData);
                window.location.href = "/list"
            }

            submitData()

        }
    }, [fileId]);

    const handleFileUpload = (file) => {
        fileUploadRef.current.handleUpload();
        console.log("Uploaded file:", file);
    }
    const handleBasicInfoData = (formData) => {
        basicInfoRef.current.handleSubmit();
        console.log(formData);
    }
    const items = [
        {
            title: 'Files',
            content: 'File upload',
            widgets: [
                <FileUpload onUpload={() => handleFileUpload} ref={fileUploadRef} setFileId={setFileId}/>
            ],
        },
        {
            title: 'Organization',
            content: <Button variant="primary" onClick={() => <AddOrgCreatorModal show={props.showModal}/>}>Add Organization</Button>,
            widgets: [
                <AddOrgCreatorModal
                    show={props.showModal}
                    handleClose={props.handleCloseModal}
                    formData={props.formData}
                    setFormData={props.setFormData}
                    handleSave={props.handleSaveModalFormData}
                />
            ]
        },
        {
            title: 'Project',
            content: 'Add Project',
        },
        {
            title: 'Funding',
            content: 'Add Funders',
        },
        {
            title: 'Basic Information',
            content: 'Digital Object Identifier',
            widgets: [
                <BasicInfo selectedOption={selectedOption} setSelectedOption={setSelectedOption}
                           selectedDate={selectedDate} setSelectedDate={setSelectedDate}
                           doi={doi} setDOI={setDOI}
                           resourceTypes={resourceTypes} setResourceTypes={setResourceTypes}
                           selectedResourceType={selectedResourceType} setSelectedResourceType={setSelectedResourceType}
                           title={title} setTitle={setTitle}
                           description={description} setDescription={setDescription}
                           showModal={showModal} setShowModal={setShowModal}
                           formData={formData} setFormData={setFormData}
                           error={error} setError={setError}
                           placeholderValue={placeholderValue} setPlaceholderValue={setPlaceholderValue}
                />
            ],
        }
    ];


    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            alert("Fill in all the highlighted required fields")
        } else {
            fileUploadRef.current.handleUpload();
        }

        setValidated(true);
    };
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="accordion-form">
                <Row>
                    <Col xs={12} lg={12} md={12}>
                        <ReusableAccordion items={items}/>
                    </Col>
                </Row>
                <Button variant="outline-success" type="submit" size="lg">Publish</Button>
            </Form>
        </>
    );
}

export default AddPublication;
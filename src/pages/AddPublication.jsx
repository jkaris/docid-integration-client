import React, {useRef, useState, useEffect} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import ReusableAccordion from "../components/accordion/MyAccordion.jsx";
import FileUpload from "../components/fileupload/FileUpload.jsx";
import BasicInfo from "../components/basicinformation/BasicInfo.jsx";
import AddOrgCreatorModal from "../components/organization/Organization.jsx";
import axios from "axios";
import AddCreatorModal from "../components/modal/CreatorModal.jsx";
import DocIdObject from "../components/DocIdObject.jsx";
import MediaObject from "../components/MediaUpload.jsx";
import MediaUpload from "../components/MediaUpload.jsx";
import CreatorOrganization from "../components/CreatorOrganization.jsx";
import Funders from "../components/Funders.jsx";
import Project from "../components/Project.jsx";
import AssociateLiterature from "../components/AssociateLiterature.jsx";
import SomeRandomAccordion from "../components/SomeRandomAccordion.jsx";

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
            title: 'DOCiD',
            content: 'Generate DOCiD',
            widgets: [
                <p>Please generate DOCiD for this record below</p>,
                <DocIdObject/>
            ],
        },
        {
            title: 'Associate Literature',
            content: 'Add Literature',
            widgets: [
                <p>Please add literature</p>,
                <AssociateLiterature/>,
            ],
        },
        {
            title: 'Files / Media',
            content: 'Upload Files',
            widgets: [
                <p>Please upload files below</p>,
                <MediaUpload/>,
            ],
        },
        {
            title: 'Creator / Organization',
            content: <p>Add creator or organization</p>,
            widgets: [
                <CreatorOrganization/>
            ]
        },
        {
            title: 'Funding',
            content: 'Funders & Granters',
            widgets: [<Funders/>,]
        },
        {
            title: 'Project',
            content: 'Add Project',
            widgets: [
                <Project/>
            ]
        },
        // {
        //     title: 'Some Random Accordion',
        //     content: 'Add Random',
        //     widgets: [
        //         <SomeRandomAccordion/>
        //     ]
        // }
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

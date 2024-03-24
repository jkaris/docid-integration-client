import { useState, useEffect, useContext } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import ReusableAccordion from "../components/ReusableAccordion.jsx";
import axios from "axios";
import AddDocIdObject from "../components/AddDocIdObject.jsx";
import AddDocument from "../components/AddDocument.jsx";
import Funders from "../components/AddFunder.jsx";
import AddProject from "../components/AddProject.jsx";
import AddPublicationContent from "../components/AddPublicationContent.jsx";
import AddCreator from "../components/AddCreator.jsx";
import Organization from "../components/AddOrganization.jsx";
import { PublicationFormContext } from "../components/context/PublicationFormContext.jsx";

function AddPublication(props) {
    const { handleFormSubmit } = useContext(PublicationFormContext);
    // const fileUploadRef = useRef(null);
    // const [selectedOption, setSelectedOption] = useState('no');
    // const [selectedDate, setSelectedDate] = useState('');
    // const [doi, setDOI] = useState('');
    // const [placeholderValue, setPlaceholderValue] = useState('');
    // const [error, setError] = useState('');
    // const [resourceTypes, setResourceTypes] = useState([]);
    // const [selectedResourceType, setSelectedResourceType] = useState(null);
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [showModal, setShowModal] = useState(false);
    // const [formData, setFormData] = useState({
    //     personName: '',
    //     familyName: '',
    //     givenName: '',
    //     identifiers: '',
    //     affiliations: '',
    //     roles: '',
    //     organization: '',
    // });
    // const [fileId, setFileId] = useState(null);
    // useEffect(() => {
    //     if (fileId !== null || fileId !== undefined) {
    //         const allFormData = {
    //             doi,
    //             selectedResourceType,
    //             title,
    //             description,
    //             placeholderValue,
    //             selectedDate,
    //             fileId,
    //             ...formData
    //         };
    //         const submitData = async () => {
    //             const _response = await axios.post('http://localhost:5000/save/basic-info', allFormData);
    //             window.location.href = "/list"
    //         }
    //
    //         // submitData()
    //
    //     }
    // }, [fileId]);

    // const handleCtxChange = (e) => {
    //     const { nm, value } = e.target;
    //     updateFormData(nm, value);
    // };

    // const handleFileUpload = (file) => {
    //     fileUploadRef.current.handleUpload();
    //     console.log("Uploaded file:", file);
    // }
    // const handleBasicInfoData = (formData) => {
    //     basicInfoRef.current.handleSubmit();
    //     console.log(formData);
    // }
    const items = [
        {
            title: 'DOCiD',
            content: 'Generate DOCiD',
            widgets: [
                <p>Please generate DOCiD for this record below</p>,
                <AddDocIdObject/>
            ],
        },
        {
            title: 'Publications',
            content: 'Add Publications',
            widgets: [
                <p>Please add publication(s) below</p>,
                <AddPublicationContent/>,
            ],
        },
        {
            title: 'Documents',
            content: 'Add Documents',
            widgets: [
                <p>Please add document(s) below</p>,
                <AddDocument/>,
            ],
        },
        {
            title: 'Creators & Organizations',
            content: <></>,
            widgets: [
                <h4>Add creators</h4>,
                <AddCreator />,
                <h4>Add organizations</h4>,
                <Organization/>,
            ]
        },
        {
            title: 'Funders',
            content: 'Add Funders',
            widgets: [
                <p>Add funder /grantor</p>,
                <Funders/>
            ]
        },
        {
            title: 'Projects',
            content: 'Add AddProject',
            widgets: [
                <AddProject/>
            ]
        },
    ];


    // const [validated, setValidated] = useState(false);

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
        <>
            <Form noValidate onSubmit={handleFormSubmit} className="accordion-form">
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

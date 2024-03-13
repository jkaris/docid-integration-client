import React, {useEffect} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import AddCreatorModal from "../modal/CreatorModal.jsx";
import Select from "react-select";

const BasicInfo = (props) => {

    // useEffect(() => {
    //     const fetchResourceTypes = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/utils/object-types');
    //             props.setResourceTypes(response.data);
    //         } catch (error) {
    //             console.error('Error fetching resource types:', error);
    //         }
    //     };
    //     fetchResourceTypes();
    // }, []);

    // const handleResourceTypeChange = (selectedOption) => {
    //     const selectedIndex = props.resourceTypes.findIndex(type => type.id === selectedOption.value);
    //     console.log('Selected Resource Type Index:', selectedIndex);
    //     props.setSelectedResourceType(selectedIndex);
    // };

    const handleDateChange = (e) => {
        props.setSelectedDate(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        props.setDescription(e.target.value);
    };
    const handleTitleChange = (e) => {
        props.setTitle(e.target.value);
    };

    // const getDataCiteDoi = async () => {
    //     try {
    //         props.setDOI('');
    //         const response = await axios.get('http://localhost:5000/doi/get-datacite-doi');
    //         props.setDOI(response.data.doi);
    //         props.setError('');
    //     } catch (error) {
    //         props.setError('Failed to get datacite DOI.');
    //     }
    // };
    // const getDocIdDoi = async () => {
    //     try {
    //         props.setDOI('');
    //         const response = await axios.get('http://localhost:5000/doi/get-docid-doi');
    //         props.setDOI(response.data.docid_doi);
    //         props.setError('');
    //     } catch (error) {
    //         props.setError('Failed to get docID DOI.');
    //     }
    // };

    // const handleDoiOptionChange = (option) => {
    //     props.setSelectedOption(option);
    //     props.setDOI('');
    //     props.setError('');
    // };

    // const handleCloseModal = () => {
    //     props.setShowModal(false);
    // };

    // const handleSaveModalData = (data) => {
    //     props.setFormData(data);
    //     props.setShowModal(false);
    // };

    // const handleSaveModalFormData = (formData) => {
    //     props.setFormData(formData);
    //     handleCloseModal();
    //     return formData;
    // };

    // useEffect(() => {
    //     props.setPlaceholderValue(props.selectedOption === 'no');
    // }, [props.selectedOption]);

    return (
        <div>
            {/*<p>Do you already have a DOI for this upload?</p>*/}
            {/*<Form.Check*/}
            {/*    inline*/}
            {/*    type="radio"*/}
            {/*    label="Yes"*/}
            {/*    name="yes-no-radio"*/}
            {/*    id="yes-radio"*/}
            {/*    value="yes"*/}
            {/*    checked={props.selectedOption === 'yes'}*/}
            {/*    onChange={() => handleDoiOptionChange('yes')}*/}
            {/*/>*/}
            {/*<Form.Check*/}
            {/*    inline*/}
            {/*    type="radio"*/}
            {/*    label="No"*/}
            {/*    name="yes-no-radio"*/}
            {/*    id="no-radio"*/}
            {/*    value="no"*/}
            {/*    checked={props.selectedOption === 'no'}*/}
            {/*    onChange={() => handleDoiOptionChange('no')}*/}
            {/*/>*/}
            {/*{props.selectedOption === 'yes' ? (*/}
            {/*    <Form.Control*/}
            {/*        placeholder="Copy/paste your existing DOI here..."*/}
            {/*        aria-label="doi"*/}
            {/*        aria-describedby="basic-addon1"*/}
            {/*        onKeyUp={(e) => setDOI(e.target.value)}*/}
            {/*        required*/}
            {/*    />*/}
            {/*) : (*/}
            {/*    <div className="d-flex">*/}
            {/*        <>*/}
            {/*            {props.error && <p>{props.error}</p>}*/}
            {/*            <Form.Control*/}
            {/*                aria-label="doi"*/}
            {/*                placeholder={props.doi}*/}
            {/*                readOnly*/}
            {/*                required*/}
            {/*            />*/}
            {/*        </>*/}
            {/*        <>*/}
            {/*            <Button variant="outline-primary" onClick={getDataCiteDoi}>*/}
            {/*                Get DataCite DOI!*/}
            {/*            </Button>*/}
            {/*            <Button variant="outline-primary" onClick={getDocIdDoi}>*/}
            {/*                Get DocID!*/}
            {/*            </Button>*/}
            {/*            <Button variant="outline-primary" disabled>*/}
            {/*                CrossRef*/}
            {/*            </Button>*/}
            {/*            <Button variant="outline-primary" disabled>*/}
            {/*                RAID*/}
            {/*            </Button>*/}
            {/*            <Button variant="outline-primary" disabled>*/}
            {/*                ROR*/}
            {/*            </Button>*/}
            {/*        </>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*<Form.Group>*/}
            {/*    <Form.Label><h5>Resource Type</h5></Form.Label>*/}
            {/*    <Select*/}
            {/*        className="mb-3"*/}
            {/*        onChange={handleResourceTypeChange}*/}
            {/*        options={props.resourceTypes.map(type => ({*/}
            {/*            value: type.id,*/}
            {/*            label: type.name*/}
            {/*        }))}*/}
            {/*        placeholder="Select resource type..."*/}
            {/*        required*/}
            {/*    />*/}
            {/*</Form.Group>*/}
            <Form.Group>
                <Form.Label><h5>Title</h5></Form.Label>
                <Form.Control required
                              placeholder="Add title..."
                              aria-label="doi"
                              aria-describedby="basic-addon1"
                              value={props.title}
                              onChange={handleTitleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label><h5>Description</h5></Form.Label>
                <Form.Control required
                              as="textarea" rows={4}
                              placeholder="Add a description"
                              value={props.description}
                              onChange={handleDescriptionChange}
                />
            </Form.Group>
            {/*<h5>Creators</h5>*/}
            {/*<Button variant="primary" onClick={() => props.setShowModal(true)} value="" required>Add Creator</Button>*/}
            {/*<AddCreatorModal*/}
            {/*    show={props.showModal}*/}
            {/*    handleClose={handleCloseModal}*/}
            {/*    formData={props.formData}*/}
            {/*    setFormData={props.setFormData}*/}
            {/*    handleSave={handleSaveModalFormData}*/}
            {/*/>*/}
            {/*<Form.Group>*/}
            {/*    <Form.Label><h5>Publication Date</h5></Form.Label>*/}
            {/*    <Form.Control*/}
            {/*        type="date"*/}
            {/*        value={props.selectedDate}*/}
            {/*        onChange={handleDateChange}*/}
            {/*        placeholder="Select a date"*/}
            {/*        aria-label="date"*/}
            {/*        aria-describedby="basic-addon2"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</Form.Group>*/}
        </div>
    );
}

export default BasicInfo;

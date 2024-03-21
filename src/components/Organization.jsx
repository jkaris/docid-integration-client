import React, {useState} from "react";
import Select from "react-select";
import {Button, Col, Form, Modal, Row, FormGroup} from "react-bootstrap";

const creatorPersonOptions = [
    {
        value: 'Obi Ngozi',
        label: 'Obi Ngozi',
        familyName: 'Ngozi',
        givenName: 'Obi',
        roles: 'Researcher',
        identifiers: 'ISSN, DOI',
        affiliations: 'UNN ARIN AfriPub',
    },
    {
        value: 'Kwame Mensah',
        label: 'Kwame Mensah',
        familyName: 'Mensah',
        givenName: 'Kwame',
        roles: 'Senior Lecturer',
        identifiers: 'ISBN, SSRN',
        affiliations: 'UG, TReND, AccraEd'
    },
    {
        value: 'Camara Fatou',
        label: 'Camara Fatou',
        familyName: 'Fatou',
        givenName: 'Camara',
        roles: 'Scientist',
        identifiers: 'ISNI, Scopus',
        affiliations: 'UGPT, AIMS Senegal, KairabaLabs'
    },
     {
        value: 'Mkalimani Fulani',
        label: 'Mkalimani Fulani',
        familyName: 'Fulani',
        givenName: 'Mkalimani',
        roles: 'Associate Professor',
        identifiers: 'ResearchGate, PubMed',
        affiliations: ' UNN, AFRIGEN, NGEDU'
    },
    {
        value: 'Abdul Mubarak',
        label: 'Abdul Mubarak',
        familyName: 'Mubarak',
        givenName: 'Abdul',
        roles: 'Coordinator',
        identifiers: ' OpenID, ResearcherID',
        affiliations: '  UoN, TCC Africa, DocID'
    },
]

const creatorOrganizationOptions = [
    {
        organization: 'Lagoon Publishers',
        label: 'Lagoon Publishers',
        name: 'Lagoon Publishers',
        identifiers: 'DOCID, DataCite',
        roles: 'Owner, Publisher',
        affiliation: 'TCC Africa'
    },
    {
        organization: 'TCC Africa Publishers',
        label: 'TCC Africa Publishers',
        name: 'TCC Africa Publishers',
        identifiers: 'DataCite, DOCID',
        roles: 'Associate Publisher, Owner',
        affiliation: 'TCC Africa'
    },
    {
        organization: 'Mnazini LLC PLT',
        label: 'Mnazini LLC PLT',
        name: 'Mnazini LLC PLT',
        identifiers: 'DOCID, DataCite',
        roles: 'Publisher',
        affiliations: 'TCC Africa'
    }
]

const AddOrgCreatorModal = ({show, handleClose, formData, setFormData, handleSave}) => {
    const [selectedOption, setSelectedOption] = useState('person');
    const [selectedCreatorPersonOption, setSelectedCreatorPersonOption] = useState(null);
    const [selectedCreatorOrgOption, setSelectedCreatorOrgOption] = useState(null);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSaveModalData = () => {
        const submittedFormData = {
            familyName: selectedCreatorPersonOption ? selectedCreatorPersonOption.familyName : '',
            givenName: selectedCreatorPersonOption ? selectedCreatorPersonOption.givenName : '',
            identifiers: selectedCreatorPersonOption ? selectedCreatorPersonOption.identifiers : '',
            affiliations: selectedCreatorPersonOption ? selectedCreatorPersonOption.affiliations : '',
            roles: selectedCreatorPersonOption ? selectedCreatorPersonOption.roles : '',
            name: selectedCreatorPersonOption ? selectedCreatorPersonOption.name : '',
        };
        handleSave(submittedFormData);
    };

    const handleCreatorOptionChange = (option) => {
        setSelectedCreatorPersonOption(option);
    };

    const handleOrganizationOptionChange = (option) => {
        setSelectedCreatorOrgOption(option);
    };

    const handlePersonFieldChange = (propertyName, e) => {
        const value = e.target.value;
        setSelectedCreatorPersonOption(prevOption => ({
            ...prevOption,
            [propertyName]: value
        }));
    };

    const handleOrgFieldChange = (propertyName, e) => {
        const value = e.target.value;
        setSelectedCreatorOrgOption(prevOption => ({
            ...prevOption,
            [propertyName]: value
        }));
    };


    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Add Creator/Organization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Check
                                inline
                                type="radio"
                                label="Person"
                                name="yes-no-radio"
                                id="person"
                                value="person"
                                checked={selectedOption === 'person'}
                                onChange={handleOptionChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Organization"
                                name="yes-no-radio"
                                id="organization"
                                value="organization"
                                checked={selectedOption === 'organization'}
                                onChange={handleOptionChange}
                            />
                            {selectedOption === 'person' && (
                                <>
                                    <Select
                                        className="mb-3"
                                        onChange={handleCreatorOptionChange}
                                        options={creatorPersonOptions}
                                        placeholder="Search for persons by name, identifier, or affiliation..."/>
                                    <FormGroup className="mb-3">
                                        <Row>
                                            <Col>
                                                <Form.Label>Family name</Form.Label>
                                                <Form.Control type="text" placeholder="Family name"
                                                              value={selectedCreatorPersonOption ? selectedCreatorPersonOption.familyName : ''}
                                                              onChange={(e) => handlePersonFieldChange('familyName', e)}
                                                              className="m-1"></Form.Control>
                                            </Col>
                                            <Col>
                                                <Form.Label>Given names</Form.Label>
                                                <Form.Control type="text" placeholder="Given names"
                                                              value={selectedCreatorPersonOption ? selectedCreatorPersonOption.givenName : ''}
                                                              onChange={(e) => handlePersonFieldChange('givenName', e)}
                                                              className="m-1"></Form.Control>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Identifiers</Form.Label>
                                        <Form.Control type="text" placeholder="e.g ORCID, ISNI, or GND"
                                                      value={selectedCreatorPersonOption ? selectedCreatorPersonOption.identifiers : ''}
                                                      onChange={(e) => handlePersonFieldChange('identifiers', e)}
                                                      className="m-1"></Form.Control>
                                        <Form.Label>Affiliations</Form.Label>
                                        <Form.Control type="text" placeholder="Search or create affiliation"
                                                      value={selectedCreatorPersonOption ? selectedCreatorPersonOption.affiliations : ''}
                                                      onChange={(e) => handlePersonFieldChange('affiliations', e)}
                                                      className="m-1"></Form.Control>
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control type="text" placeholder="Contact person"
                                                      value={selectedCreatorPersonOption ? selectedCreatorPersonOption.roles : ''}
                                                      onChange={(e) => handlePersonFieldChange('roles', e)}
                                                      className="m-1"></Form.Control>
                                    </FormGroup>
                                </>
                            )}
                            {selectedOption === "organization" && (
                                <>
                                    <Select
                                        className="mb-3"
                                        onChange={handleOrganizationOptionChange}
                                        options={creatorOrganizationOptions}
                                        placeholder="Search for an organization by name, identifier, ir affiliation..."/>
                                    <FormGroup className="mb-3">


                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Organization name"
                                                      value={selectedCreatorOrgOption ? selectedCreatorOrgOption.name : ''}
                                                      onChange={(e) => handleOrgFieldChange('name', e)}
                                                      className="m-1"></Form.Control>

                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Identifiers</Form.Label>
                                        <Form.Control type="text" placeholder="e.g ROR, ISNI, or GND"
                                                      value={selectedCreatorOrgOption ? selectedCreatorOrgOption.identifiers : ''}
                                                      onChange={(e) => handleOrgFieldChange('identifiers', e)}
                                                      className="m-1"></Form.Control>
                                        <Form.Label>Affiliations</Form.Label>
                                        <Form.Control type="text" placeholder="Search or create affiliation"
                                                      value={selectedCreatorOrgOption ? selectedCreatorOrgOption.affiliations : ''}
                                                      onChange={(e) => handleOrgFieldChange('affiliations', e)}
                                                      className="m-1"></Form.Control>
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control type="text" placeholder="Contact person"
                                                      value={selectedCreatorOrgOption ? selectedCreatorOrgOption.roles : ''}
                                                      onChange={(e) => handleOrgFieldChange('roles', e)}
                                                      className="m-1"></Form.Control>
                                    </FormGroup>
                                </>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveModalData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
};

export default AddOrgCreatorModal;
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

const Creator = () => {
    const [rows, setRows] = useState([{ fullname: '', familyName: '', givenName: '', identifier: '', affiliation: '', role: '' }]);

    const handleInputChange = (value, fieldName, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][fieldName] = value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { fullname: '', familyName: '', givenName: '', identifier: '', affiliation: '', role: '' }]);
    };

    const roleOptions = [
        {
            value: "associate professor",
            label: "Associate Professor"
        }
    ]

    return (
        <div>
            {rows.map((row, index) => (
                <Row key={index} className="m-3">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Full Name"
                            value={row.fullname}
                            onChange={(e) => handleInputChange(e.target.value, 'fullname', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Family Name"
                            value={row.familyName}
                            onChange={(e) => handleInputChange(e.target.value, 'familyName', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Given Name"
                            value={row.givenName}
                            onChange={(e) => handleInputChange(e.target.value, 'givenName', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Identifier"
                            value={row.identifier}
                            onChange={(e) => handleInputChange(e.target.value, 'identifier', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Affiliation"
                            value={row.affiliation}
                            onChange={(e) => handleInputChange(e.target.value, 'affiliation', index)}
                        />
                    </Col>
                    <Col>
                        <Select
                            options={roleOptions}
                            placeholder="Select Role"
                            onChange={(selectedOption) => handleInputChange(selectedOption, 'role', index)}
                        />
                    </Col>
                    <Col>
                        {index === rows.length - 1 && (
                            <Button variant="success" onClick={handleAddRow}>+</Button>
                        )}
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default Creator;

// import React, {useState} from 'react';
// import {
//     Button,
//     ButtonGroup,
//     Col,
//     Form,
//     FormGroup,
//     Modal,
//     ModalBody,
//     ModalFooter,
//     ModalHeader,
//     Row
// } from 'react-bootstrap';
// import Select from "react-select";
//
// const CreatorModal = ({show, handleClose}) => {
//     const [selectedCreatorPersonOption, setSelectedCreatorPersonOption] = useState(null);
//     const creatorPersonOptions = [
//         {
//             value: 'Obi Ngozi',
//             label: 'Obi Ngozi',
//             familyName: 'Ngozi',
//             givenName: 'Obi',
//             roles: 'Researcher',
//             identifiers: 'ISSN, DOI',
//             affiliations: 'UNN ARIN AfriPub',
//         },
//         {
//             value: 'Kwame Mensah',
//             label: 'Kwame Mensah',
//             familyName: 'Mensah',
//             givenName: 'Kwame',
//             roles: 'Senior Lecturer',
//             identifiers: 'ISBN, SSRN',
//             affiliations: 'UG, TReND, AccraEd'
//         },
//         {
//             value: 'Camara Fatou',
//             label: 'Camara Fatou',
//             familyName: 'Fatou',
//             givenName: 'Camara',
//             roles: 'Scientist',
//             identifiers: 'ISNI, Scopus',
//             affiliations: 'UGPT, AIMS Senegal, KairabaLabs'
//         },
//         {
//             value: 'Mkalimani Fulani',
//             label: 'Mkalimani Fulani',
//             familyName: 'Fulani',
//             givenName: 'Mkalimani',
//             roles: 'Associate Professor',
//             identifiers: 'ResearchGate, PubMed',
//             affiliations: ' UNN, AFRIGEN, NGEDU'
//         },
//         {
//             value: 'Abdul Mubarak',
//             label: 'Abdul Mubarak',
//             familyName: 'Mubarak',
//             givenName: 'Abdul',
//             roles: 'Coordinator',
//             identifiers: ' OpenID, ResearcherID',
//             affiliations: '  UoN, TCC Africa, DocID'
//         },
//     ]
//
//     const handleOptionChange = (e) => {
//         setSelectedOption(e.target.value);
//     };
//
//     const handleCreatorOptionChange = (option) => {
//         setSelectedCreatorPersonOption(option);
//     };
//
//
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <ModalHeader>
//                 <h2>Add CreatorOrganization</h2>
//             </ModalHeader>
//             <ModalBody>
//                 <Form>
//                     <Form.Group className="mb-3">
//                         <Select
//                             className="mb-3"
//                             onChange={handleCreatorOptionChange}
//                             options={creatorPersonOptions}
//                             placeholder="Search for persons by name, identifier, or affiliation..."/>
//                         <FormGroup className="mb-3">
//                             <Row>
//                                 <Col>
//                                     <Form.Label>Family name</Form.Label>
//                                     <Form.Control type="text" placeholder="Family name"
//                                                   value={selectedCreatorPersonOption ? selectedCreatorPersonOption.familyName : ''}
//                                                   onChange={(e) => handlePersonFieldChange('familyName', e)}
//                                                   className="m-1"></Form.Control>
//                                 </Col>
//                                 <Col>
//                                     <Form.Label>Given names</Form.Label>
//                                     <Form.Control type="text" placeholder="Given names"
//                                                   value={selectedCreatorPersonOption ? selectedCreatorPersonOption.givenName : ''}
//                                                   onChange={(e) => handlePersonFieldChange('givenName', e)}
//                                                   className="m-1"></Form.Control>
//                                 </Col>
//                             </Row>
//                         </FormGroup>
//                         <FormGroup className="mb-3">
//                             <Form.Label>Identifiers</Form.Label>
//                             <Form.Control type="text" placeholder="e.g ORCID, ISNI, or GND"
//                                           value={selectedCreatorPersonOption ? selectedCreatorPersonOption.identifiers : ''}
//                                           onChange={(e) => handlePersonFieldChange('identifiers', e)}
//                                           className="m-1"></Form.Control>
//                             <Form.Label>Affiliations</Form.Label>
//                             <Form.Control type="text" placeholder="Search or create affiliation"
//                                           value={selectedCreatorPersonOption ? selectedCreatorPersonOption.affiliations : ''}
//                                           onChange={(e) => handlePersonFieldChange('affiliations', e)}
//                                           className="m-1"></Form.Control>
//                             <Form.Label>Role</Form.Label>
//                             <Form.Control type="text" placeholder="Contact person"
//                                           value={selectedCreatorPersonOption ? selectedCreatorPersonOption.roles : ''}
//                                           onChange={(e) => handlePersonFieldChange('roles', e)}
//                                           className="m-1"></Form.Control>
//                         </FormGroup>
//                     </Form.Group>
//                 </Form>
//             </ModalBody>
//             <ModalFooter>
//                 <Button>Add CreatorOrganization</Button>
//             </ModalFooter>
//         </Modal>
//     );
// };
//
// const OrganizationModal = ({show, handleClose}) => {
//     const [selectedCreatorOrgOption, setSelectedCreatorOrgOption] = useState(null);
//     const [selectedOption, setSelectedOption] = useState('person');
//     const handleOrganizationOptionChange = (option) => {
//         setSelectedCreatorOrgOption(option);
//     };
//
//     const creatorOrganizationOptions = [
//         {
//             organization: 'Lagoon Publishers',
//             label: 'Lagoon Publishers',
//             name: 'Lagoon Publishers',
//             identifiers: 'RoR, Ringgold',
//             roles: 'Owner, Publisher',
//             affiliation: 'TCC Africa'
//         },
//         {
//             organization: 'TCC Africa Publishers',
//             label: 'TCC Africa Publishers',
//             name: 'TCC Africa Publishers',
//             identifiers: 'RoR',
//             roles: 'Associate Publisher, Owner',
//             affiliation: 'TCC Africa'
//         },
//         {
//             organization: 'Mnazini LLC PLT',
//             label: 'Mnazini LLC PLT',
//             name: 'Mnazini LLC PLT',
//             identifiers: 'Ringgold',
//             roles: 'Publisher',
//             affiliations: 'TCC Africa'
//         }
//     ]
//
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <ModalHeader>
//                 <h2>Add Organization</h2></ModalHeader>
//             <ModalBody>
//                 <Select
//                     className="mb-3"
//                     onChange={handleOrganizationOptionChange}
//                     options={creatorOrganizationOptions}
//                     placeholder="Search for organization by name, identifier, or affiliation..."/>
//                 <FormGroup className="mb-3">
//
//
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" placeholder="Organization name"
//                                   value={selectedCreatorOrgOption ? selectedCreatorOrgOption.name : ''}
//                                   onChange={(e) => handleOrgFieldChange('name', e)}
//                                   className="m-1"></Form.Control>
//
//                 </FormGroup>
//                 <FormGroup className="mb-3">
//                     <Form.Label>Identifiers</Form.Label>
//                     <Form.Control type="text" placeholder="e.g ROR, ISNI, or GND"
//                                   value={selectedCreatorOrgOption ? selectedCreatorOrgOption.identifiers : ''}
//                                   onChange={(e) => handleOrgFieldChange('identifiers', e)}
//                                   className="m-1"></Form.Control>
//                     <Form.Label>Affiliations</Form.Label>
//                     <Form.Control type="text" placeholder="Search or create affiliation"
//                                   value={selectedCreatorOrgOption ? selectedCreatorOrgOption.affiliations : ''}
//                                   onChange={(e) => handleOrgFieldChange('affiliations', e)}
//                                   className="m-1"></Form.Control>
//                     <Form.Label>Role</Form.Label>
//                     <Form.Control type="text" placeholder="Contact person"
//                                   value={selectedCreatorOrgOption ? selectedCreatorOrgOption.roles : ''}
//                                   onChange={(e) => handleOrgFieldChange('roles', e)}
//                                   className="m-1"></Form.Control>
//                 </FormGroup>
//             </ModalBody>
//             <ModalFooter>
//                 <Button>Add Organization</Button>
//             </ModalFooter>
//         </Modal>
//     );
// };
//
// function CreatorOrganization() {
//     const [showCreatorModal, setShowCreatorModal] = useState(false);
//     const [showOrganizationModal, setShowOrganizationModal] = useState(false);
//
//     const handleOpenCreatorModal = () => {
//         setShowCreatorModal(true);
//     };
//
//     const handleOpenOrganizationModal = () => {
//         setShowOrganizationModal(true);
//     };
//
//     const handleCloseCreatorModal = () => {
//         setShowCreatorModal(false);
//     };
//
//     const handleCloseOrganizationModal = () => {
//         setShowOrganizationModal(false);
//     };
//
//     return (
//         <>
//             <ButtonGroup>
//                 <Button className="m-2" size="md" onClick={handleOpenCreatorModal}>
//                     Add CreatorOrganization
//                 </Button>
//                 <Button className="m-2" size="md" onClick={handleOpenOrganizationModal}>
//                     Add Organization
//                 </Button>
//             </ButtonGroup>
//             <CreatorModal show={showCreatorModal} handleClose={handleCloseCreatorModal}/>
//             <OrganizationModal show={showOrganizationModal} handleClose={handleCloseOrganizationModal}/>
//         </>
//     );
// }
//
// export default CreatorOrganization;

import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

const CreatorOrganization = () => {
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

export default CreatorOrganization;

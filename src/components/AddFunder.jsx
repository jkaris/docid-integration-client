import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

const AddFunder = () => {
    const [rows, setRows] = useState([{ type: '', name: '', id: '', activity: '' }]);

    const handleInputChange = (value, fieldName, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][fieldName] = value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { type: '', name: '', id: '', activity: '' }]);
    };

    return (
        <div>
            {rows.map((row, index) => (
                <Row key={index} className="m-3">
                    <Col>
                        <Select
                            options={[{ value: 'funder', label: 'AddFunder' }, { value: 'grantor', label: 'Grantor' }]}
                            placeholder="Select Type"
                            onChange={(selectedOption) => handleInputChange(selectedOption, 'type', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={row.name}
                            onChange={(e) => handleInputChange(e.target.value, 'name', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter ID"
                            value={row.id}
                            onChange={(e) => handleInputChange(e.target.value, 'id', index)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Activity"
                            value={row.activity}
                            onChange={(e) => handleInputChange(e.target.value, 'activity', index)}
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

export default AddFunder;

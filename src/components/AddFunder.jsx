import React, { useContext, useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";

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
                <FunderRow key={index} row={row} index={index} rows={rows} setRows={setRows} handleAddRow={handleAddRow} />
            ))}
        </div>
    );
};

const FunderRow = (props) => {
    const { row, index, rows, setRows, handleAddRow } = props;
    const { frmData, updateFormData } = useContext(PublicationFormContext);

    const roleOptions = [
        {
            value: "associate professor",
            label: "Associate Professor"
        }
    ];
    const handleInputChange = (value, fieldName, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][fieldName] = value;
        setRows(updatedRows);

        const org = [...frmData.funders];
        org[index] = rows[index];
        if (fieldName === "type") {
            org[index].type = org[index].type.value;
        }
        updateFormData("funders", org);
    }

    return (


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
    );
};

export default AddFunder;

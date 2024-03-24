import React, { useContext, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";

const AddCreator = () => {
    const [rows, setRows] = useState([{
        full_name: "",
        family_name: "",
        given_name: "",
        identifier: "",
        affiliation: "",
        role: ""
    }]);

    const handleAddRow = () => {
        setRows([...rows, {
            full_name: "",
            family_name: "",
            given_name: "",
            identifier: "",
            affiliation: "",
            role: ""
        }]);
    };

    return (
        <div>
            {rows.map((row, index) => (
                <CreatorRow row={row} index={index} rows={rows} setRows={setRows} handleAddRow={handleAddRow} />
            ))}
        </div>
    );
};

const CreatorRow = (props) => {
    const { row, index, rows, setRows, handleAddRow } = props;
    const { frmData, updateFormData } = useContext(PublicationFormContext);
    const handleInputChange = (value, fieldName, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][fieldName] = value;
        setRows(updatedRows);

        const crt = [...frmData.creators];
        crt[index] = rows[index];
        if (fieldName === "role") {
            // console.log(crt[index])
            crt[index].role = crt[index].role.value;
        }
        updateFormData("creators", crt);
    };

    const roleOptions = [
        {
            value: "associate professor",
            label: "Associate Professor"
        }
    ];

    return (
        <Row className="m-3">
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={row.full_name}
                    onChange={(e) => handleInputChange(e.target.value, "full_name", index)}
                />
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Enter Family Name"
                    value={row.family_name}
                    onChange={(e) => handleInputChange(e.target.value, "family_name", index)}
                />
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Enter Given Name"
                    value={row.given_name}
                    onChange={(e) => handleInputChange(e.target.value, "given_name", index)}
                />
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Enter Identifier"
                    value={row.identifier}
                    onChange={(e) => handleInputChange(e.target.value, "identifier", index)}
                />
            </Col>
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Enter Affiliation"
                    value={row.affiliation}
                    onChange={(e) => handleInputChange(e.target.value, "affiliation", index)}
                />
            </Col>
            <Col>
                <Select
                    options={roleOptions}
                    placeholder="Select Role"
                    onChange={(selectedOption) => handleInputChange(selectedOption, "role", index)}
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

export default AddCreator;

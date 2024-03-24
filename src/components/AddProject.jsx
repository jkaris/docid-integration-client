import React, { useContext, useState } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { PublicationFormContext } from "./context/PublicationFormContext.jsx";
import Select from "react-select";

const AddProject = ({ onAddProject }) => {
    const [rows, setRows] = useState([{ title: '', description: '' }]);

    const handleInputChange = (value, fieldName, rowIndex) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][fieldName] = value;
        setRows(updatedRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { title: '', description: '' }]);
    };

    return (
        <div>
            {rows.map((row, index) => (
                <ProjectRow key={index} row={row} index={index} rows={rows} setRows={setRows} handleAddRow={handleAddRow} />
            ))}
        </div>
    );
};

const ProjectRow = (props) => {
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

        const org = [...frmData.projects];
        org[index] = rows[index];
        updateFormData("projects", org);
    }

    return (

        <Row key={index} className="m-3 align-items-center">
            <Col>
                <Form.Control
                    type="text"
                    placeholder="Enter project title"
                    value={row.title}
                    onChange={(e) => handleInputChange(e.target.value, 'title', index)}
                />
            </Col>
            <Col>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter project description"
                    value={row.description}
                    onChange={(e) => handleInputChange(e.target.value, 'description', index)}
                />
            </Col>
            <Col xs="auto">
                {index === rows.length - 1 && (
                    <Button variant="success" onClick={handleAddRow}>+</Button>
                )}
            </Col>
        </Row>
    );
};

export default AddProject;

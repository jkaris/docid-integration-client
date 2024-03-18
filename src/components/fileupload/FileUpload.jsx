import React, {useState, forwardRef, useImperativeHandle} from "react";
import {Form} from "react-bootstrap";
import Select from "react-select";

const FileUpload = forwardRef(({onUpload, setFileId}, ref) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }
        onUpload(selectedFile);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('file_name', selectedFile.name);
        formData.append('file_extension', selectedFile.name.split('.').pop());
        formData.append('date_of_upload', new Date().toISOString());

        fetch('http://localhost:5000/save/file-info', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }
                return response.json();
            })
            .then(data => {
                console.log('File uploaded successfully:', data);
                setFileId(data.file_id)
            })
            .catch(error => {
                console.error('Error uploading file:', error.message);
            });
    };

    const fileTypes = [
    {value: 'video', label: 'Video'},
    {value: 'webinar', label: 'Webinar'},
    {value: 'illustration', label: 'Illustration'},
    {value: 'interview', label: 'Interview'}
    ]

    useImperativeHandle(ref, () => ({
        handleUpload: handleUpload
    }));

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Media type: </Form.Label><Select options={fileTypes}/>
                <Form.Label>Select a file to upload.</Form.Label>
                <Form.Control required type="file" onChange={handleFileChange} multiple/>
                <Form.Label>Generate Handles/Ark Keys</Form.Label>
                <Form.Control
                    placeholder="Handles/Ark keys"
                    aria-label="file-handles"
                    aria-describedby="basic-addon1"
                    onKeyUp={(e) => setDOI(e.target.value)}
                    required
                />
            </Form.Group>
        </>
    );
});
export default FileUpload;
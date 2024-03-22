import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function ViewPublication(props) {
    const [publication, setPublication] = useState(null);
    const {id} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/utils/get-publication/${id}`);
                setPublication(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div>
           {publication ? (
                <div>
                    <h2>Title: {publication.title}</h2>
                    <p>DOI: {publication.doi}</p>
                    <p>File Name: {publication.file_name}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewPublication;
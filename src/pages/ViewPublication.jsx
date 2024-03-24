import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function ViewPublication(props) {
    const [publication, setPublication] = useState(null);
    const {id} = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5099/utils/get-publication/${id}`);
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
                    <h2>Title: {publication.data?.title}</h2>
                    <p>DOI: {publication.data?.doc_id}</p>
                    <p>File Name: {publication.data?.file?.length}</p>
                    <code className={"w-75 m-4"} >{JSON.stringify(publication.data)}</code>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ViewPublication;

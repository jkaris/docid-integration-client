import React, {useEffect, useState} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {NavLink} from "react-router-dom";

function ListPublications(props) {
    const [pubs, setPubs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5099/utils/get-publications/all')
        setPubs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    }, []);
    return (
        <>
            <p>List</p>
            <Table striped bordered hover>
      <thead>
      <tr>
          <th>#</th>
          <th>Title</th>
          <th>DOI</th>
          <th>File</th>
          <th></th>
      </tr>
      </thead>
        <tbody>
        {pubs.map((pub, index)=> (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{pub.data.title}</td>
                <td>{pub.data.doc_id}</td>
                <td>Files: {pub.data?.file?.length}</td>
                <td className={"end"}><NavLink key={index} to={`/view/${pub.id}`}>View</NavLink></td>
            </tr>
        ))}

        </tbody>
            </Table>
        </>

    );
}

export default ListPublications;

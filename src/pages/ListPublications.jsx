import React, {useEffect, useState} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {NavLink} from "react-router-dom";

function ListPublications(props) {
    const [pubs, setPubs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/utils/get-publications')
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
                <td>{pub.title}</td>
                <td>{pub.doi}</td>
                <td>{pub.file_name}</td>
                <td className={"end"}><NavLink key={index} to={`/view/${pub.id}`}>View</NavLink></td>
            </tr>
        ))}

        </tbody>
            </Table>
        </>

    );
}

export default ListPublications;
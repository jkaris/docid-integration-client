import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import {components} from "react-select";
import axios from "axios";

const Search = () => {
    const [options, setOptions] = useState([]);

    const fetchData = async (inputValue, callback) => {
        if (inputValue.length) {
            try {
                const response = await axios.get(`http://localhost:5000/utils/get-publications/${inputValue}`)


                const data = response.data.map(item => ({
                    value: item.id,
                    label: item.title
                }));

                callback(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
    const handleSelectChange = (selectedOption) => {
        console.log('Selected value:', selectedOption.value);
        window.location.href=`/view/${selectedOption.value}`
    };

    const DropdownIndicator = (props) => {
      return (
          <components.DropdownIndicator {...props}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" style={{width: "20px"}}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                  </svg>
          </components.DropdownIndicator>
      );
    };
    const customStyle = {
      input: (styles) => ({ ...styles, minWidth: "250px"}),
    };


    return (
        <AsyncSelect
            styles={customStyle}
            loadOptions={fetchData}
            components={{DropdownIndicator}}
            defaultOptions
            onChange={handleSelectChange}
            placeholder="Search publications"
        />
    );
};


export default Search;
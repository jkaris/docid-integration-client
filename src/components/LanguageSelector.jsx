import React, { useEffect, useState } from "react";
import Select from 'react-select'

const API_URL = import.meta.env.VITE_API_URL;

export const LanguageSelector = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}/utils/languages`);
                if (!response.ok) {
                    throw new Error("Failed to fetch languages");
                }
                const data = await response.json();
                const formattedOptions = data.map(option => ({
                    value: option.description,
                    label: option.name,
                }));
                setOptions(formattedOptions);
            } catch (error) {
                console.error('Error fetching options:',
                console.error);
            }
        };
        fetchOptions();
    }, []);

    return <Select options={options}/>;
}

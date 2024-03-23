import React, { useEffect, useState } from "react";
import Select from 'react-select'

export const LanguageSelector = () => {
    const [options, setOptions] = useState([]);

    const languageOptions = [
        {
            label: "English",
            value: "english"
        },
        {
            label: "Swahili",
            value: "Swahili"
        },
        {
            label: "Portuguese",
            value: "portuguese"
        },
        {
            label: "Chinese (Traditional)",
            value: "chinese traditional"
        },
        {
            label: "Chinese (Mandarin)",
            value: "chinese mandarin"
        },
        {
            label: "Hindi",
            value: "hindi"
        }
    ]

    return <Select options={languageOptions}/>;
}

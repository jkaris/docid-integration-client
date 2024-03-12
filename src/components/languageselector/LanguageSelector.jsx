import React from 'react'
import Select from 'react-select'

const options = [
    {value: 'english', label: 'English'},
    {value: 'swahili', label: 'Swahili'},
    {value: 'portuguese', label: 'Portuguese'}
]

export const LanguageSelector = () => {
    return <Select options={options}/>;
}

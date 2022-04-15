import React from 'react'
import { AutoComplete } from 'antd';
import './ui/filter.css'

function CityFilter ({value, cities, onChange}) {
    return (
        <AutoComplete
            placeholder="Filter by location"
            allowClear={true}
            value={value}
            options={cities}
            onChange={(event) =>onChange(event)}
        />
    )
}

export default CityFilter
import React from 'react'
import { AutoComplete } from 'antd';
import './ui/filter.css'

function TagFilter ({value, tags, onChange}) {
    return (
        <AutoComplete
            placeholder="Filter by Tag"
            allowClear={true}
            value={value}
            options={tags}
            onChange={(event) => onChange(event)}
            className="filter"
        />
    )
}

export default TagFilter
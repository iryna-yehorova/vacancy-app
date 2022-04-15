import React from 'react'
import { AutoComplete } from 'antd';
import './ui/filter.css'

function TagFilter ({value, tags, onChange}) {
    return (
        <div>
            <AutoComplete
                placeholder="Filter by Tag"
                allowClear={true}
                value={value}
                options={tags}
                onChange={(event) => onChange(event)}
                className="filter"
            />
        </div>
    )
}

export default TagFilter
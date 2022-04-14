import React from 'react'
import { AutoComplete } from 'antd';

function TagFilter ({value, tags, onChange}) {
    return (
        <div>
            <label>Filter by tags</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="tags filter"
                allowClear={true}
                value={value}
                options={tags}
                onChange={(event) => onChange(event)}
            />
        </div>
    )
}

export default TagFilter
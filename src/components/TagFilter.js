import React from 'react'
import { AutoComplete } from 'antd';

function TagFilter (props) {
    function handleTagChange(event) {
        props.onChange(event)
    }
    return (
        <div>
            <label>Filter by tags</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="tags filter"
                allowClear={true}
                value={props.value}
                options={props.tags}
                onChange={handleTagChange}
            />
        </div>
    )
}

export default TagFilter
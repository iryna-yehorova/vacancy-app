import React from 'react'
import { AutoComplete } from 'antd';

function TagFilter (props) {
    return (
        <div>
            <label>Filter by tags</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="tags filter"
                allowClear={true}
                value={props.value}
                options={props.tags}
                onChange={(event) => props.onChange(event)}
            />
        </div>
    )
}

export default TagFilter
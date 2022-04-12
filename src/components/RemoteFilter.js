import React from 'react'
import { AutoComplete } from 'antd';

const filterOptions = [
    {value: 'true', label: 'Yes'},
    {value: 'false', label: 'No'},
]

function RemoteFilter (props) {
    return (
        <div>
            <label>Remote Filter</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="remote filter"
                allowClear={true}
                value={props.value}
                options={filterOptions}
                onChange={(event) => props.onChange(event)}
            />
        </div>
    )
}

export default RemoteFilter
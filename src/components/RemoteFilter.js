import React from 'react'
import { AutoComplete } from 'antd';

const filterOptions = [
    {value: 'true', label: 'Yes'},
    {value: 'false', label: 'No'},
]

function RemoteFilter (props) {
    function handleRemoteChange(event) {
        props.onChange(event)
    }

    return (
        <div>
            <label>Remote Filter</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="remote filter"
                allowClear={true}
                value={props.value}
                options={filterOptions}
                onChange={handleRemoteChange}
            />
        </div>
    )
}

export default RemoteFilter
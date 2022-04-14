import React from 'react'
import { AutoComplete } from 'antd';

const filterOptions = [
    {value: 'true', label: 'Yes'},
    {value: 'false', label: 'No'},
]

function RemoteFilter ({value, onChange}) {
    return (
        <div>
            <label>Remote Filter</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="remote filter"
                allowClear={true}
                value={value}
                options={filterOptions}
                onChange={(event) => onChange(event)}
            />
        </div>
    )
}

export default RemoteFilter
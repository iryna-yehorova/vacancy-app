import React from 'react'
import { AutoComplete } from 'antd';

const filterOptions = [
    {value: 'Remote', label: 'Yes'},
    {value: 'Office', label: 'No'},
]

function RemoteFilter ({value, onChange}) {
    return (
        <div>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="Filter by remote"
                allowClear={true}
                value={value}
                options={filterOptions}
                onChange={(event) => onChange(event)}
            />
        </div>
    )
}

export default RemoteFilter
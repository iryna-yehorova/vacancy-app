import React from 'react'
import { AutoComplete } from 'antd';

function CityFilter ({value, cities, onChange}) {
    return (
        <div>
            <label>Filter by location</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="city filter"
                allowClear={true}
                value={value}
                options={cities}
                onChange={(event) =>onChange(event)}
            />
        </div>
    )
}

export default CityFilter
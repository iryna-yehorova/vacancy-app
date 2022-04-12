import React from 'react'
import { AutoComplete } from 'antd';

function CityFilter (props) {
    return (
        <div>
            <label>Filter by location</label>
            <AutoComplete
                style={{ width: 300 }}
                placeholder="city filter"
                allowClear={true}
                value={props.value}
                options={props.cities}
                onChange={(event) => props.onChange(event)}
            />
        </div>
    )
}

export default CityFilter
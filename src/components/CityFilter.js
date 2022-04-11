import React from 'react'
import { AutoComplete } from 'antd';

class CityFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onCityChange(e.target.value)
    }

    render() {
        return (
            <div>
                <label>Filter by location</label>
                <AutoComplete
                    style={{ width: 300 }}
                    placeholder="city filter"
                    allowClear={true}
                    value={this.props.value}
                    options={this.props.cities}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default CityFilter
import React from 'react'
import { AutoComplete } from 'antd';

const filterOptions = [
    {value: 'true', label: 'Yes'},
    {value: 'false', label: 'No'},
]

class RemoteFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onRemoteChange(e.target.value)
    }

    render() {
        return (
            <div>
                <label>Remote possibility</label>
                <AutoComplete
                    style={{ width: 300 }}
                    placeholder="remote filter"
                    allowClear={true}
                    value={this.props.value}
                    options={filterOptions}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default RemoteFilter
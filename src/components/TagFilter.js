import React from 'react'
import { AutoComplete } from 'antd';

class TagFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTagChange(e.target.value)
    }

    render() {
        return (
            <div>
                <label>Filter by tags</label>
                <AutoComplete
                    style={{ width: 300 }}
                    placeholder="tags filter"
                    allowClear={true}
                    value={this.props.value}
                    options={this.props.tags}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default TagFilter
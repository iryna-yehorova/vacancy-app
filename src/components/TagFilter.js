import React from 'react'

class TagFilter extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTagChange(e.target.value)
    }

    render() {
        const value = this.props.value
        return (
            <div>
                <label>Filter by tags</label>
                <select value={value} onChange={this.handleChange} multiple={false}>
                    {this.props.tags.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default TagFilter
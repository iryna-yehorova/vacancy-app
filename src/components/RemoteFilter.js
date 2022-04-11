import React from 'react'

const filterOptions = [
    {value: 'true', text: 'Yes'},
    {value: 'false', text: 'No'},
    {value: '', text: 'None'}
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
        const value = this.props.value
        return (
            <div>
                <label>Remote possibility</label>
                <select value={value} onChange={this.handleChange}>
                    {filterOptions.map((item, index) => (
                        <option value={item.value} key={index}>
                            {item.text}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default RemoteFilter
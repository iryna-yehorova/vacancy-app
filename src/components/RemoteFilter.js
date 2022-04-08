import React from 'react'

class RemoteFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterOptions: [
                {value: 'true', text: 'Yes'},
                {value: 'false', text: 'No'},
            ],
            value: {}
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {}

    render() {
        return (
            <div>
            <label>Remote possibility</label>
            <select value={this.state.value} onChange={this.handleChange}>
                {this.state.filterOptions.map((item, index) => (
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
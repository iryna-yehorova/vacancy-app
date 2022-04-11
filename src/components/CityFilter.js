import React from 'react'

class CityFilter extends React.Component {
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
                <label>Filter by location</label>
                <select value={value} onChange={this.handleChange} multiple={false}>
                    {this.props.cities.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default CityFilter
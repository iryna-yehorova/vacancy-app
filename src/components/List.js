import React from 'react'
import Vacancy from "./ListItem"
import RemoteFilter from "./RemoteFilter"
import CityFilter from "./CityFilter"


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            filteredList: [],
            remote: '',
            cityFilter: '',
            cityList: []
        }
        this.handleRemoteChange = this.handleRemoteChange.bind(this);
        this.handleCityFilterChange = this.handleCityFilterChange.bind(this);
    }

    handleRemoteChange(remote) {
        this.setState({remote})
        this.filterList()
    }
    
    handleCityFilterChange(cityFilter) {
        this.setState({cityFilter})
        this.filterList()
    }
    
    getList() {
        const url = 'https://www.arbeitnow.com/api/job-board-api'
        fetch(`${url}`)
        .then(response => response.json())
        .then(jobs => {
            const list = jobs.data.map(j => {
            return {
                slug: j.slug,
                companyName: j.company_name,
                title: j.title,
                description: j.description,
                remote: j.remote,
                url: j.url,
                tags: j.tags,
                jobTypes: j.job_types,
                location: j.location,
                createdAt: j.created_at
            }
            })
            this.setState({list, filteredList: list})
            this.getCityList()
        })
    }

    getCityList() {
        const allList = this.state.list.map(j => j.location);
        const uniqList = [ ...new Set(allList)];
        const list = uniqList.sort()
        this.setState({cityList: list})
    }

    filterList() {
        let filter= {
            remote: this.state.remote,
            city: this.state.cityFilter
        }

        let list = this.state.list

        if(filter.remote && filter.remote === 'true') {
            list = list.filter(l => l.remote)
        }
        if(filter.remote && filter.remote === 'false') {
            list = list.filter(l => !l.remote)
        }
        
        if(filter.city) {
            list = list.filter(l => l.location === filter.city)
        }
        
        this.setState({filteredList: list})
    }

    renderVacancy(title, remote) {
        return (
          <Vacancy
            value={title}
            remote={remote}
          />
        );
      }

    componentDidMount() {
        this.getList()
    }

    render() {
        return (
            <div>
                <RemoteFilter 
                    value={this.state.remote}
                    onRemoteChange={this.handleRemoteChange}
                />
                 <CityFilter 
                    value={this.state.cityFilter}
                    cities={this.state.cityList}
                    onRemoteChange={this.handleCityFilterChange}
                />
                <table>
                    <tbody>
                        {this.state.filteredList.map((item, index) => (
                            <tr key={index+1}>
                                {this.renderVacancy(item.title, item.remote)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List

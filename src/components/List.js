import React from 'react'
import ListItem from "./ListItem"
import RemoteFilter from "./RemoteFilter"
import CityFilter from "./CityFilter"
import TagFilter from "./TagFilter"

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            filteredList: [],
            remote: '',
            cityFilter: '',
            cityList: [],
            tagFilter: '',
            tagList: []
        }
        this.handleRemoteChange = this.handleRemoteChange.bind(this);
        this.handleCityFilterChange = this.handleCityFilterChange.bind(this);
        this.handleTagFilterChange = this.handleTagFilterChange.bind(this);
    }

    handleRemoteChange(remote) {
        this.setState({remote})
        this.filterList()
    }
    
    handleCityFilterChange(cityFilter) {
        this.setState({cityFilter})
        this.filterList()
    }

    handleTagFilterChange(tagFilter) {
        this.setState({tagFilter})
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
                this.getTagList()
            })
    }

    getCityList() {
        const allList = this.state.list.map(j => j.location);
        const uniqList = [ ...new Set(allList)];
        const list = uniqList.sort()
        this.setState({cityList: list})
    }

    getTagList() {
        let allList = []
        this.state.list.forEach(j => allList = [...j.tags, ...allList]);
        const uniqList = [ ...new Set(allList)];
        const list = uniqList.sort()
        this.setState({tagList: list})
    }

    filterList() {
        let filter= {
            remote: this.state.remote,
            city: this.state.cityFilter,
            tag: this.state.tagFilter
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

        if(filter.tag) {
            list = list.filter(l => l.tags.includes(filter.tag))
        }
        
        this.setState({filteredList: list})
    }

    renderVacancy(title, remote) {
        return (
          <ListItem
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
                    onCityChange={this.handleCityFilterChange}
                />
                <TagFilter
                    value={this.state.tagFilter}
                    tags={this.state.tagList}
                    onTagChange={this.handleTagFilterChange}
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

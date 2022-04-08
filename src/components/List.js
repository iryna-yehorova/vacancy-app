import React from 'react'
import Vacancy from "./ListItem"
import RemoteFilter from "./RemoteFilter"


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            filteredList: [],
            remote: ''
        }
        this.handleRemoteChange = this.handleRemoteChange.bind(this);
    }

    handleRemoteChange(remote) {
        this.setState({remote})
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
        })
    }

    filterList() {
        let list = this.state.list

        if(this.state.remote && this.state.remote === 'true') {
            list = list.filter(l => l.remote)
        }
        if(this.state.remote && this.state.remote === 'false') {
            list = list.filter(l => !l.remote)
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

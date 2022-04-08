import React from 'react'
import Vacancy from "./ListItem"
import RemoteFilter from "./RemoteFilter"


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            list: [],
            filter: {
                remote: {}
            }
        }
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
            this.setState({list})
        })
    }

    renderVacancy(title) {
        return (
          <Vacancy
            value={title}
          />
        );
      }

    componentDidMount() {
        this.getList()
    }

    render() {
        return (
            <div>
                <RemoteFilter />
                <table>
                    <tbody>
                        {this.state.list.map((item, index) => (
                            <tr key={index+1}>
                                {this.renderVacancy(item.title)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List

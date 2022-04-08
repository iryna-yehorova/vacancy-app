import React from 'react'
import Vacancy from "./ListItem"


class List extends React.Component {
    state = {
        list: []
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

    renderVacancy(index, title) {
        return (
          <Vacancy
            value={title}
            key={index}
          />
        );
      }

    render() {
        if(this.state.list.length === 0) {
            this.getList()
        }
        return (
            <table className="table">
                <tbody>
                    {this.state.list.map((item, index) => (
                        <tr key={item.id}>
                            {this.renderVacancy(index+1, item.title)}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default List

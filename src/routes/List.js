import React, { useState, useEffect  } from 'react'
import RemoteFilter from "../components/RemoteFilter"
import CityFilter from "../components/CityFilter"
import TagFilter from "../components/TagFilter"
import { Link } from "react-router-dom";

function List() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [remoteFilter, setRemoteFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');

    // get data from api
    useEffect( () => {
        getList()
    })

    function getList() {
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
                setList(list);
                setFilteredList(list);
                getCityList(list);
                getTagList(list)
            })
    }

    // get cities and tags lists

    const getCityList = (data) => {
        const allList = data.map(j => j.location);
        const uniqList = [ ...new Set(allList)];
        const list = uniqList.sort().map(i => {
            return {
                value: i,
                label: i
            }
        })
        setCityList(list)
    }

    const getTagList = (data) => {
        let allList = []
        data.forEach(j => allList = [...j.tags, ...allList]);
        const uniqList = [ ...new Set(allList)];
        const list = uniqList.sort().map(i => {
            return {
                value: i,
                label: i
            }
        })
        setTagList(list)
    };
 
    // filter data
    // filterList() {
    //     let filter= {
    //         remote: this.state.remote,
    //         city: this.state.cityFilter,
    //         tag: this.state.tagFilter
    //     }

    //     let list = this.state.list

    //     if(filter.remote && filter.remote === 'true') {
    //         list = list.filter(l => l.remote)
    //     }

    //     if(filter.remote && filter.remote === 'false') {
    //         list = list.filter(l => !l.remote)
    //     }

    //     if(filter.city) {
    //         list = list.filter(l => l.location === filter.city)
    //     }

    //     if(filter.tag) {
    //         list = list.filter(l => l.tags.includes(filter.tag))
    //     }
        
    //     this.setState({filteredList: list})
    // }

    function handleRemoteChange(data) {
        setRemoteFilter(data)
    }

    function handleCityChange(data) {
        setCityFilter(data)
    }

    function handleTagChange(data) {
        setTagFilter(data)
    }

    function renderVacancy(title) {
        return (
            <td>
                <Link
                    to='vacancy'
                >
                    {title}
                </Link>
            </td>
        );
      }

    return (
        <div>
            <RemoteFilter 
                value={remoteFilter}
                onChange={handleRemoteChange}
            />
            <CityFilter 
                value={cityFilter}
                cities={cityList}
                onChange={handleCityChange}
            />
            <TagFilter
                value={tagFilter}
                tags={tagList}
                onChange={handleTagChange}
            />
            <table>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index+1}>
                            {renderVacancy(item.title)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List

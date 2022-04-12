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
    }, [])

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
    }

    // set filters
    const handleRemoteChange = (data) => setRemoteFilter(data)
    const handleCityChange = (data) => setCityFilter(data)
    const handleTagChange = (data) => setTagFilter(data)

    // filter data
    useEffect(() => {
        filterList(remoteFilter, cityFilter, tagFilter)
    }, [remoteFilter, cityFilter, tagFilter])

    function filterList(remote, city, tag) {
        let filter= {
            remote,
            city,
            tag
        }

        let data = list

        if(filter.remote && filter.remote === 'true') {
            data = data.filter(l => l.remote)
        }

        if(filter.remote && filter.remote === 'false') {
            data = data.filter(l => !l.remote)
        }

        if(filter.city) {
            data = data.filter(l => l.location === filter.city)
        }

        if(filter.tag) {
            data = data.filter(l => l.tags.includes(filter.tag))
        }
        
        setFilteredList(data)
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

import React, { useState, useEffect, useContext  } from 'react'
import RemoteFilter from "../../components/RemoteFilter"
import CityFilter from "../../components/CityFilter"
import TagFilter from "../../components/TagFilter"
import { Link } from "react-router-dom"
import AppContext from "../../helpers/AppContext"
import useInfiniteScroll from '../../helpers/useInfiniteScroll'
import "./list.css"
import { Row, Col, Card, List } from 'antd';

function JobsList() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [remoteFilter, setRemoteFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [isFetching, setIsFetching] = useInfiniteScroll(getList);
    const [page, setPage] = useState(1)
    const dataContext = useContext(AppContext);
    

    // get data from api
    useEffect( () => {
        getList()
    }, [])

    function getList() {
        const API_URL = 'https://www.arbeitnow.com/api';
        fetch(API_URL + '/job-board-api?page=' + page)
            .then(response => response.json())
            .then(jobs => {
                const data = jobs.data.map(j => {
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
                setList([...list, ...data]);
                setFilteredList([...list, ...data]);
                dataContext.setDataList([...list, ...data])
                getCityList([...list, ...data]);
                getTagList([...list, ...data]);
                setPage(page + 1)
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
        let data = list

        if(remote && remote === 'Remote') {
            data = data.filter(l => l.remote)
        }

        if(remote && remote === 'Office') {
            data = data.filter(l => !l.remote)
        }

        if(city) {
            data = data.filter(l => l.location === city)
        }

        if(tag) {
            data = data.filter(l => l.tags.includes(tag))
        }
        
        setFilteredList(data)
    }

    function renderVacancy(title, slug) {
        return (
            <div className="list-item">
                <Link
                    to={{
                        pathname: '/vacancy/' + slug
                    }}
                >
                    {title}
                </Link>
                </div>
        );
      }

    return (
        <Row>
            <Col span={18}>
                <List
                    size="large"
                    dataSource={filteredList}
                    renderItem={item => renderVacancy(item.title, item.slug)}
                />
            </Col>
            <Col span="6">
                <Card className="filter-card">
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
                </Card>
            </Col>
        </Row>
    );
}

export default JobsList

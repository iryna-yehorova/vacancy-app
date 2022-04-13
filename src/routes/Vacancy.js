import { useState, useContext, useEffect } from 'react'
import AppContext from "../helpers/AppContext"
import { useParams } from "react-router-dom";

export default function Vacancy() {
  const[vacancy, setVacancy] = useState({})
  let params = useParams();
  const dataContext = useContext(AppContext)

  // get certain vacancy from data context
  const getVacancy = () => {
    const job = dataContext.dataList.find(item => item.slug === params.slug)
    setVacancy(job)
  }

  useEffect( () => {
    getVacancy()
  }, [])

  return <h2>Vacancy: {vacancy.title}</h2>;
}
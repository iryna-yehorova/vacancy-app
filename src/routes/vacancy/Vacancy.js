import { useState, useContext, useEffect } from 'react'
import AppContext from "../../helpers/AppContext"
import createDOMPurify from 'dompurify'
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card } from 'antd';
import "./vacancy.css"

export default function Vacancy() {
  const[vacancy, setVacancy] = useState({})
  let params = useParams();
  const dataContext = useContext(AppContext)

  const DOMPurify = createDOMPurify(window)

  // get certain vacancy from data context
  const getVacancy = () => {
    const job = dataContext.dataList.find(item => item.slug === params.slug)
    setVacancy(job)
  }
  
  useEffect( () => {
    getVacancy()
  }, [])

  return (
    <Card title={vacancy.title} headStyle={{fontWeight: 'bold', fontSize: '24px'}}>
      <Row justify="space-around">
        <Col span={20}>
          { <section dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vacancy.description) }} /> }
        </Col>
        <Col span={4}>
          <section >
            <div>
              <span>Company: </span>
              <span className="company">{vacancy.companyName}</span>
            </div>
            <div>
              <span>
                Location: 
              </span>
              <span className="location">{vacancy.location}</span>
            </div>
            <div>
              { vacancy.remote ? (
                <div className="label remote">Remote</div>
              ) : null
              }
            </div>
            <div>
              { vacancy.jobTypes && vacancy.jobTypes.length > 0 
                ? vacancy.jobTypes.map((type, index) => {
                    return (
                      <div key={index} className="label type">{type.toLowerCase()}</div>
                    )
                  })
                : null
              }
            </div>
            <div>
              { vacancy.tags && vacancy.tags.length > 0 
                ? vacancy.tags.map((tag, index) => {
                    return (
                      <div key={index} className="label tag ">{tag.toLowerCase()}</div>
                    )
                  })
                : null
            }
            </div>
          </section>
        </Col>
      </Row>
      <Row className="btn-actions">
        <Link to={{pathname: '/' }} className="link">
          Back
        </Link>
        <a href={vacancy.url} target="_blank" rel="noopener noreferrer" className="link">
          Apply
        </a>
      </Row>        
    </Card>
   
  );
}
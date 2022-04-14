import { useState, useContext, useEffect } from 'react'
import AppContext from "../../helpers/AppContext"
import createDOMPurify from 'dompurify'
import { useParams } from "react-router-dom";
import { Row, Col, Card } from 'antd';

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
    <Card title={vacancy.title} bodyStyle={{}} headStyle={{}}>
      <Row justify="space-around">
        <Col span={16}>
          { <section dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vacancy.description) }} /> }
        </Col>
        <Col span={8}>
          <section >
            <div>
              <span>Company name: </span>
              <span>{vacancy.companyName}</span>
            </div>
            <div>
              <span>Remote:</span>
              <span>{ vacancy.remote ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span>
                Location:
              </span>
              <span>{ vacancy.location}</span>
            </div>
            <div>
              <span>Job Types:</span>
              { vacancy.jobTypes && vacancy.jobTypes.length > 0 
                ? vacancy.jobTypes.map((type, index) => {
                    return (
                      <span key={index}>{type}</span>
                    )
                  })
                : null
              }
            </div>
            <div>
              <span>Tags:</span>
              { vacancy.tags && vacancy.tags.length > 0 
                ? vacancy.tags.map((tag, index) => {
                    return (
                      <span key={index}>{tag}</span>
                    )
                  })
                : null
            }
            </div>
          </section>
        </Col>
      </Row>
      <Row>
        <button>
          Back
        </button>
        <button>
          Apply
        </button>
      </Row>        
    </Card>
   
  );
}
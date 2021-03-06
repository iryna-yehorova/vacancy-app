import React, { useState }  from 'react';
import './App.css';
import JobsList from "./routes/list/JobsList"
import { PageHeader } from 'antd';
import AppContext from './helpers/AppContext.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vacancy from "./routes/vacancy/Vacancy.js"

const App = () => {
  const [dataList, setDataList] = useState([])

  const dataSettings = {
    dataList,
    setDataList
  }
  
    return (
      <AppContext.Provider value={dataSettings}>
        <div>
          <header className="App-header">
            <PageHeader
              backIcon={false}
              title="Vacancy Finding App"
            />
          </header>
          <main>
            <BrowserRouter> 
              <Routes>
                  <Route exact path="/" element={<JobsList />}/>
                  <Route exact path="/vacancy/:slug" element={<Vacancy />} />
                  <Route
                    path="*"
                    element={
                      <main>
                        <p>There's nothing here!</p>
                      </main>
                    }
                  /> 
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </AppContext.Provider>
    )
}

export default App

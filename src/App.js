import React  from 'react';
import './App.css';
import List from "./routes/List"
import { PageHeader } from 'antd';

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <PageHeader
            className="site-page-header"
            backIcon={false}
            title="Vacancy Finding App"
          />
        </header>
        <main>
          <List />
        </main>
      </div>
    )
}

export default App;

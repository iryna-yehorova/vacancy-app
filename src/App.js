import React  from 'react';
import './App.css';
import List from "./components/List"

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <span>Vacancy Finding App</span>
          <span>Arbeit Now</span>
        </header>
        <main>
          <List />
        </main>
      </div>
    )
}

export default App;

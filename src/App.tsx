import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import NavComponent from './shared/nav';

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <NavComponent />
      </BrowserRouter>
    </div>
  );
};

export default App;

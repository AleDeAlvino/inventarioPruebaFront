// import logo from './logo.svg';
// import './App.css';
import React from 'react';
// import { render } from 'react-dom';
import Inicio from './app/Pages/Inicio';
import Agregar from './app/Pages/Agregar';
import Editar from './app/Pages/Editar';
import Metricas from './app/Pages/Metricas';

import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          {/* <Route exact path="/Login">
            <Login />
          </Route> */}
          <Route exact path="/" element={<Inicio/>}/>
          <Route exact path="/agregar" element={<Agregar/>}/>
          <Route exact path="/editar" element={<Editar />}/>
          <Route exact path="/metricas" element={<Metricas />}/>
          <Route render={() => <h1>Not found!</h1>} />
        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;

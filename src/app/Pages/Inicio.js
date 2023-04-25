import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import '../../Styles/Inicio.css';
import icon1 from '../../static_images/inventario.png';
import icon2 from '../../static_images/metrica.png';
import {
    useNavigate
} from "react-router-dom";

function Inicio() {

const navigate = useNavigate();
  const handleClick = () => {
    navigate('/agregar');
  }
  const handleClick2 = () => {
    navigate('/metricas');
  }

  return (
    <div className="contenedorInicio">
        <div className="cuadroMayor"></div>
        <div className="cuadro" onClick={handleClick}>
            <h1>Inventario</h1>
            <img src={icon1} alt="icono" className="icono"/>
        </div>
        <div className="cuadro" onClick={handleClick2}>
            <h1>Metricas</h1>
            <img src={icon2} alt="icono" className="icono"/>
        </div>
    </div>
  );
}

export default Inicio;

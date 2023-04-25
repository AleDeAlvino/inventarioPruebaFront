import React, { useState, useEffect } from "react";
import '../../Styles/Inicio.css';
import '../../Styles/Agregar.css';
import {
    useNavigate, useLocation
} from "react-router-dom";
import Select from 'react-select';
import { HOST } from '../../config/config';

function Editar(props) {

    const navigate = useNavigate();

    const [film, setFilm] = useState([]);
    const [films, setFilms] = useState([]);
    const [select, setSelect] = useState([]);
    const [isDisabled, setisDisabled] = useState(true);
    const [stock, setStock] = useState(0);
    const { state } = useLocation();
    

    // const handleClick = () => {
    //     // navigate(`/inventario`);
    // }



    const fetchFilms = async () => {
        console.log('este es id: '+state.id);
        console.log('este es name: '+state.name);
        try {
            const response = await (
            await fetch(HOST + `/show_film`)
            ).json();
            // const data = response.data
            const data = response.data.map(film => ({
                value: film.film_id,
                label: film.title,
              }));
            setFilm(data);
        } catch (err) {
            console.log(err);
        }
    };

    const Editar = async () => {

        try {
            const response = await (
            await fetch(HOST + `/update_inventory/${state.id}/${select.value}`)
            ).json();
            if(response.code===200){
                window.alert(response.message);
                navigate(`/agregar`);
            }
        } catch (err) {
            console.log(err);
        }
    };


    function handleSeleccionar(opcion) {
        console.log(opcion);
        setSelect(opcion);
    }

  useEffect(() => {
    fetchFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contenedorAgregar">
        <div id="liveAlertPlaceholder"></div>
        <div className="Selector">
            <div className="selectores">
                <h1>Edite la pelicula de esta relacion store-film</h1>
            </div>
            <div className="selectores">
                <h3>Store: {state.name}</h3>
                <Select options={film} className="inp_sel" onChange={handleSeleccionar}/>
            </div>
            <div>
                <button type="button" className="btn btn-success btn_bus" onClick={()=>Editar()}>Guardar</button>
            </div>
        </div>
        
    </div>
  );
}

export default Editar;

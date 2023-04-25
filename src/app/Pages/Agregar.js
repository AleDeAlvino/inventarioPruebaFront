import React, { useState, useEffect, useRef } from "react";
import '../../Styles/Inicio.css';
import '../../Styles/Agregar.css';
import {
    useNavigate
} from "react-router-dom";
import Select from 'react-select';
import { HOST } from '../../config/config';

function Inicio() {

const navigate = useNavigate();

    const [store, setStore] = useState([]);
    const [film, setFilm] = useState([]);
    const [films, setFilms] = useState([]);
    const [select1, setSelect1] = useState([]);
    const [select2, setSelect2] = useState([]);
    const [isDisabled, setisDisabled] = useState(true);
    const [stock, setStock] = useState(0);

    const handleClick = (id, name) => {
        navigate('/editar', {state: {id:id, name: name}});
    }
    
    const token = useRef();


    const fetchStore = async () => {

        try {
            const response = await fetch(HOST + `/show_store`);
            const data = await response.json();
            console.log(data.data);
            const data2 = data.data.map(store => ({
                value: store.address_id,
                label: store.address,
              }));
            console.log(data2)
            setStore(data2);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchFilms = async () => {

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

    const searchInventory = async () => {
        console.log('entreee');
        try {
            const response = await (
            await fetch(HOST + `/show_inventory/${select1.value}/${select2.value}/`)
            ).json();
            const cont = response.cont;
            const data = response.data;
            console.log(cont);
            setStock(cont);
            setFilms(data);
            console.log(response.code);
            if(response.code===200){
                setisDisabled(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const AgregarInv = async () => {
        console.log('entreee')
        try {
            const response = await (
            await fetch(HOST + `/add_inventory/${select1.value}/${select2.value}`)
            ).json();
            const message = response.message;
            console.log(message);
            if(response.code===200){
                searchInventory();
                window.alert("Felicidades se agrego al inventario");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteDato = async (id) => {
        console.log('hi')
        try {
            const response = await (
                await fetch(HOST + `/delete_inventory/${id}/`)
            ).json();
            const message = response.message;
            console.log(message);
            if(response.code===200){
                searchInventory();
                window.alert("Se elimino el dato");
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleSeleccionar(opcion) {
        console.log(opcion);
        setSelect1(opcion);
    }
    function handleSeleccionar2(opcion) {
        console.log(opcion);
        setSelect2(opcion);
    }

//   const options = [
//     // { value: 'chocolate', label: 'Chocolate' },
//     // { value: 'strawberry', label: 'Strawberry' },
//     // { value: 'vanilla', label: 'Vanilla' },
    
//   ];  

  useEffect(() => {
    fetchStore();
    fetchFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contenedorAgregar">
        <div id="liveAlertPlaceholder"></div>
        <div className="Selector">
        <div className="selectores">
                <h3>Store</h3>
                <h3>film</h3>
            </div>
            <div className="selectores">
                <Select options={store} className="inp_sel" onChange={handleSeleccionar}/>
                <Select options={film} className="inp_sel" onChange={handleSeleccionar2}/>
            </div>
            <button type="button" className="btn btn-success btn_bus" onClick={searchInventory}>Buscar</button>
            <div className="message_table">
                <div className="txt_eje">
                    <h3>Existen {stock} ejemplares en esta tienda</h3>
                </div>
                <button type="button" className="btn btn-success btn_agr" onClick={AgregarInv} disabled={isDisabled}> Agregar </button>
            </div>
            <div>
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">inventory_id</th>
                    <th scope="col">film_id</th>
                    <th scope="col">store_id</th>
                    <th scope="col">last_update</th>
                  </tr>
                </thead>
                <tbody>
                  {films.map((datos) => {
                    if(!datos){
                        datos = {'inventory_id': 0, 'film_store':0, 'store_id':0, 'last_update': 0}
                    }
                    return (
                      <tr key={datos.inventory_id}>
                        <td>{datos.inventory_id}</td>
                        <td>{datos.film}</td>
                        <td>{datos.store_id}</td>
                        <td>{datos.last_update}</td>
                        <td>
                          <button onClick={() => deleteDato(datos.inventory_id)} className="btn btn-danger">Delete</button>
                          <button onClick={() => handleClick(datos.inventory_id, select1.label)} className="btn btn-info" style={{marginTop: '4px'}}>edit</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
            </table>
            </div>
        </div>
        
    </div>
  );
}

export default Inicio;

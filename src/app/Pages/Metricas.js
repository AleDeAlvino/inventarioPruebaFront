import React, { useState, useEffect, useRef } from "react";
import '../../Styles/Inicio.css';
import '../../Styles/Agregar.css';
import '../../Styles/Metricas.css';
import {
    useNavigate
} from "react-router-dom";
import Select from 'react-select';
import { HOST } from '../../config/config';

function Inicio() {

const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [films, setFilms] = useState([]);

    const fetchCustomer = async () => {

        try {
            const response = await (
                await fetch(HOST + `/best_custom`)
                ).json();
                const data = response.data
                console.log(data)
                setCustomers(data);
        } catch (err) {
                console.log(err);
        }
    };

    const fetchFilms = async () => {

        try {
            const response = await (
            await fetch(HOST + `/best_rent`)
            ).json();
            const data = response.data
            console.log(data)
            // const data = response.data.map(film => ({
            //     value: film.film_id,
            //     label: film.title,
            //   }));
            setFilms(data);
        } catch (err) {
            console.log(err);
        }
    };

  useEffect(() => {
    fetchCustomer();
    fetchFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contenedorAgregar">
        <div id="liveAlertPlaceholder">
            <h3>5 best customers</h3>
        </div>
        <div className="selectors">
            <div className="cuadroMet">
                <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">customer_id</th>
                        <th scope="col">first_name</th>
                        <th scope="col">last_name</th>
                        <th scope="col">cantidad de rentas</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            customers.map((custom) => {
                                return(
                                    <tr key={custom.customer_id}>
                                        <td>{custom.customer_id}</td>
                                        <td>{custom.customer__first_name}</td>
                                        <td>{custom.customer__last_name}</td>
                                        <td>{custom.numero}</td>
                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </div>
            <h3>5 most best rent movies</h3>
            <div className="cuadroMet">
            <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">film_id</th>
                        <th scope="col">film_name</th>
                        <th scope="col">cantidad de rentas</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            films.map((film) => {
                                return(
                                    <tr key={film.inventory__film__film_id}>
                                        <td>{film.inventory__film__film_id}</td>
                                        <td>{film.inventory__film__title}</td>
                                        <td>{film.numero}</td>
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

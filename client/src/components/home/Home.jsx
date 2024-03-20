import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux'
import "./Home.css";
import Cards from "../cards/Cards";
import { filterCards, filterCardsLocation, orderCards} from "../../redux/action";
import axios from 'axios';

function Home(props) {

  const dispatch = useDispatch();
  const URLGenres = 'http://localhost:3001/genres'
  const [genres, setGenres] = useState([]); 

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(URLGenres);
        setGenres(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de equipos:', error.message);
      }
    }
    fetchGenres();
  }, []);


  const storeVideogames = useSelector(state =>state.videogames)
  if(storeVideogames.length > 1 && !props.flag){
    props = {videogames:storeVideogames}
  }

  const handleOrder = (evento) => {
    dispatch(orderCards(evento.target.value))
  }

  const handleFilter = (evento) =>{
    dispatch(filterCards(evento.target.value))
  }

  const handleFilterLocation = (evento) => {
    dispatch(filterCardsLocation(evento.target.value))
  }

    return (
      <div className='home'>
        <div className='filtros'>
          <div className="custom-select">
            <select name="order" defaultValue='orderVideogames' onChange={handleOrder}>
              <option value="orderVideogame" disabled='disabled'>Order</option>
              <option value="ascendenteID">Ascendente ID</option>
              <option value="descendenteID">Descendente ID</option>
              <option value="ascendenteRating">Ascendente Rating</option>
              <option value="descendenteRating">Descendente Rating</option>
            </select>
          </div>

          <div className="custom-select">
            <select name="filterLocation" defaultValue='locationVideogames' onChange={handleFilterLocation}>
              <option value="locationVideogames" disabled='disabled'>Filter</option>
              <option value="API">API</option>
              <option value="DB">Database</option>
            </select>
          </div>

          <div className="custom-select">
            <select name="filter" defaultValue='All' onChange={handleFilter}>
              <option value="All">All</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre.name}>{genre.name}</option>
              ))}
            </select>
          </div>
        </div>
        <Cards videogames={props} />
      </div>
    );
  }
export default Home;
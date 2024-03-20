import { useState, useEffect } from 'react'
import "./Details.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';

function Details() {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({})
  const URL = "http://localhost:3001/videogames/"

  useEffect(() => {
    axios.get(`${URL}${id}`)
      .then(({ data }) => {
        setVideogame(data);
      })
  }, [])

  return (
  <div className="detail">
    <img src={videogame.image} alt='imagen del videojuego' />

    
    <div className="detail-section">
      <h5 className='titulo'>{videogame.name}</h5>
    </div>
    

    <div className="detail-section">
      <h4>Description:</h4>
      <h5>{videogame.description}</h5>
    </div>

    <div className='selectors'>

      <div className="detail-section">
        <h4>Release:</h4>
        <p>{videogame.released}</p>
      </div>

      <div className="detail-section">
        <h4>Rating:</h4>
        <p>{videogame.rating}</p>
      </div>
      <div className="detail-section platforms">
        <h4>Platforms:</h4>
        <ul>
          {videogame.platforms && videogame.platforms.map((platform, index) => (
            <li key={index}>{platform}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section genres">
        <h4>Genres:</h4>
        <ul>
          {videogame.genres && videogame.genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
}

export default Details

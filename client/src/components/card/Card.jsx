import { Link } from "react-router-dom";
import React from 'react'
import './Card.css'

function Card({id, name, image, genres, rating}) {

  // Función para generar las estrellas basadas en el rating
  const renderStars = () => {
    const stars = [];
    // Itera sobre el rating y agrega una estrella por cada punto
    for (let i = 0; i <= rating - 1; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <Link to={`/detail/${id}`}>
      <div id="divCard">
        <img src={image} alt={name}/>
        <h2>{name}</h2>
        <div id="rating">{renderStars()} {rating}</div>
        <div id="genres">
          {genres.map((genre, index) => (
            <h3 id="genre" key={index}>{genre}</h3>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default Card

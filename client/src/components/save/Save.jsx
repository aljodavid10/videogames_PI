import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Save.css";

function Save() {

  const [videogame, setVideogame] = useState({
    name: '',
    description: '',
    image: '',
    release: '',
    genres: [],
    platforms: [],
    rating: ""
  });
  const URLPlatforms = 'http://localhost:3001/platforms';
  const URLGenres = 'http://localhost:3001/genres';
  const URL = 'http://localhost:3001/videogames';
  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]); 
  const [platforms, setPlatforms] = useState([]);
  const [rating, setRating] = useState('');

  const handleRatingChange = (event) => {
    const value = event.target.value;
    // Limitar el valor del rating entre 1 y 5
    if (value >= 1 && value <= 5) {
      setRating(value);
      handleChange(event);
    }
  };

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await axios.get(URLPlatforms);
        setPlatforms(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de plataformas:', error.message);
      }
    }
    fetchPlatforms();
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(URLGenres);
        setGenres(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de generos:', error.message);
      }
    }
    fetchGenres();
  }, []);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'genres') {
      if (checked) {
        setVideogame(prevState => ({ ...prevState, genres: [...prevState.genres, value] }));
      } else {
        setVideogame(prevState => ({ ...prevState, genres: prevState.genres.filter(genre => genre !== value) }));
      }
    } else if(name === 'platforms'){
      if (checked) {
        setVideogame(prevState => ({ ...prevState, platforms: [...prevState.platforms, value] }));
      } else {
        setVideogame(prevState => ({ ...prevState, platforms: prevState.platforms.filter(platform => platform !== value) }));
      }
    }else{
      setVideogame({ ...videogame, [name]: value });
    }
  };
  

  const handleSubmit = async (event) => {
    let { name, value } = event.target;
    if(name === 'genres' || name === 'platforms'){
      
    }
    setVideogame({
      ...videogame,
      [event.target.name]: event.target.value
    });
    event.preventDefault();
    const validationErrors = validation(videogame);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log(videogame)
        const response = await axios.post(URL, videogame);
        alert('El videojuego se ha creado exitosamente:', response.data);

        setVideogame({
          name: '',
          description: '',
          image: '',
          release: '',
          genres: [],
          platforms: [],
          rating:""
        });
      } catch (error) {
        console.error('Error al crear el videojuego:', error.message);
      }
    }
  };

  return (
    <div className='formulario-container'>
      <form className='formulario' onSubmit={handleSubmit}>
        <h2>Agregar videojuego</h2>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={videogame.name} onChange={handleChange} required/>
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea id="description" name="description" value={videogame.description} onChange={handleChange} rows="4" required></textarea>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen (URL):</label>
          <input type="url" id="image" name="image" value={videogame.image} onChange={handleChange} required/>
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="released">Fecha de lanzamiento:</label>
          <input type="date" id="released" name="release" value={videogame.release} onChange={handleChange} required/>
          {errors.released && <span className="error">{errors.released}</span>}
        </div>

        <label htmlFor="rating">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          required
        />
        {errors.rating && <span className="error">{errors.rating}</span>}

        <div className="form-group">
          <label htmlFor="genres">Géneros:</label>
          <div className='selectorGenres'>
            {genres.map(genre => (
              <label key={genre.id} className='checkGenre'>
                <input
                  type="checkbox"
                  name="genres"
                  value={genre.name}
                  onChange={handleChange}
                  checked={videogame.genres.includes(genre.name)}
                />
                {genre.name}
              </label>
            ))}
          </div>
          {errors.genres && <span className="error">{errors.genres}</span>}
        </div>

        <label htmlFor="selectedGenres">Generos seleccionados:</label>
        <label>-{videogame.genres.join(', ')}</label>

        <div className="form-group">
          <label htmlFor="platforms">Plataformas:</label>
          <div className='selectorPlatforms'>
            {platforms.map(platform => (
              <label key={platform.id} className='checkPlatform'>
                <input
                  type="checkbox"
                  name="platforms"
                  value={platform.name}
                  onChange={handleChange}
                  checked={videogame.platforms.includes(platform.name)}
                />
                {platform.name}
              </label>
            ))}
          </div>
          {errors.genres && <span className="error">{errors.genres}</span>}
        </div>

        <label htmlFor="selectedPlatforms">Plataformas seleccionadas:</label>
        <label>-{videogame.platforms.join(', ')}</label>


        <button type="submit">CREAR NUEVO VIDEOJUEGO</button>
      </form>
    </div>
  );
}
function validation(data) {
  let errors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!data.description.trim()) {
    errors.description = 'La descripción es obligatoria';
  }

  if (!data.image.trim()) {
    errors.image = 'La URL de la imagen es obligatoria';
  } else if (!isValidUrl(data.image)) {
    errors.image = 'La URL de la imagen no es válida';
  }

  if (!data.release) {
    errors.release = 'La fecha de lanzamiento es obligatoria';
  }

  if (!Array.isArray(data.genres) || data.genres.length === 0) {
    errors.genres = 'Seleccionar al menos un género es obligatorio';
  }

  if (!Array.isArray(data.platforms) || data.platforms.length === 0) {
    errors.genres = 'Seleccionar al menos un género es obligatorio';
  }

  return errors;
}

function isValidUrl(url) {
  // Esta función valida si la URL es válida. Puedes mejorarla según tus necesidades.
  // Aquí te dejo un ejemplo básico que verifica si la URL comienza con 'http://' o 'https://':
  return /^https?:\/\//.test(url);
}

export default Save;
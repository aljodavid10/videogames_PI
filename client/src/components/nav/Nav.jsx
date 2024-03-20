import { Link } from "react-router-dom";
import "./Nav.css";
import SearchBar from '../searchBar/SearchBar';

function Nav({ onSearch, onLoadHome }) {  
  const handleLoadHome = () => {
    onLoadHome();
  };

  return (
    <div className='barraNavegacion'>
      <SearchBar onSearch={onSearch} />
      <Link to='/home'><button className="Home" onClick={handleLoadHome}>Ver todos los videojuegos</button></Link>
      <Link to='/save'><button className="NewVideogame">Ingresar videojuego</button></Link>
    </div>
  )
}

export default Nav;
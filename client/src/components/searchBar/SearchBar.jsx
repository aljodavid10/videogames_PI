import { useState } from 'react';
import "./SearchBar.css";

function SearchBar(props) {
  const [name, setName] = useState('');

   function handleChange(evento){
      setName(evento.target.value)
   }

   const search = () => {
      props.onSearch(name);
      setName("");
   }

   const searchEnter = () => {
      if(event.key === 'Enter') {
         props.onSearch(name);
         setName("");  
      }
   }
  return (
    <div id="searchZone">
       <input type='search' onChange={handleChange}
       placeholder="Buscar videojuego:" value={name} onKeyDown={searchEnter}/>
       <button onClick={search} >Buscar</button>
    </div>
 );
}

export default SearchBar
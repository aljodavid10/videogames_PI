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
       <button className='buscar' onClick={search} ><img src="../../../images/lupa_logo.png" alt="" /></button>
       <input className='inputBuscar' type='search' onChange={handleChange}
       placeholder="Buscar videojuego:" value={name} onKeyDown={searchEnter}/>
    </div>
 );
}

export default SearchBar
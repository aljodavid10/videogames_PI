import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update } from './redux/action';
import './App.css';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import Detail from './components/detail/Details';
import Save from './components/save/Save'

function App() {

  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [videogames, setVideogames]=useState([]);
  const [access, setAccess] = useState(false);
  const URL = "http://localhost:3001/videogames";
  const [flag, setFlag] = useState(false)

  const onSearch = async (name) =>{

    try {
      if(!name) 
        return alert('Ingresa un nombre');
      const { data } = await axios.get(`${URL}?name=${name}`);
      if(data.length > 0){
        setVideogames([ ...data]);
        setFlag(true);
      } else{
        alert(`No hay personajes con el nombre ${name}`);
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const loadHome = async () => {
    try {
      const { data } = await axios.get(`${URL}`);
      setVideogames([ ...data]);
      dispatch(update(data))
    } catch (error) {
      alert(error.message)
    }
  }

  const submit = (acceso) => {
    if(acceso)
      setAccess(acceso);
      access && navigate('/home');
  }

  useEffect(()=>{
    !access && navigate('/')
   },[access])

  return (
    <div className='App'>
      {pathname !== "/" && <Nav onSearch = {onSearch} onLoadHome={loadHome}/>}
        <Routes>
            <Route path="/" element={<LandingPage LandingPage={submit} onLoadHome={loadHome}/>} />
            <Route path="/home" element={<Home videogames={videogames} flag={flag}/>}/>
            <Route path="/detail/:id" element={<Detail/>}/>
            <Route path="/save" element={<Save/>}/>
        </Routes>
    </div>
  )
}

export default App

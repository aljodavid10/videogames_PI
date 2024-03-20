import { useState } from 'react'
import Card from '../card/Card'
import Pagination from '../pagination/pagination';
import './Cards.css'

function Cards(props) {
  const [page, setPage]  = useState(1);
  const [byPage, setByPage] = useState(15);
  const { videogames } = props.videogames

  const max = Math.ceil(videogames.length / byPage);
  return (
    <div id='divCards'>
      <div id='cards'>
        {
          videogames
          .slice((page - 1) * byPage, (page - 1) * byPage + byPage)
          .map(videogame=>(
            <Card 
              key= {videogame.id}
              id={videogame.id}
              name={videogame.name}
              image={videogame.image}
              genres={videogame.genres}
              rating={videogame.rating}
            />
          ))
        }
      </div>
      <div id='pagination'>
        <Pagination page={page} setPage={setPage} max={max}/>
      </div>
    </div>
  )
}

export default Cards
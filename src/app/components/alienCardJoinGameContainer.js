import React, { useState, useEffect } from 'react'
import { AlienCard } from './alienCard'

export const AlienCardJoinGameContainer = ({aliensJugador}) => {
  const [aliens, setAliens] = useState(JSON.parse(localStorage.getItem('alienList')) || [])
 
  const [filteredAliens, setFilteredAliens] = useState([]);

  useEffect(() => {

    const matchingAliens = aliens.filter(alien => aliensJugador.includes(alien.Nombre));
    setFilteredAliens(matchingAliens);
    
 
  }, [aliens, aliensJugador]);

  return (
<div className="flex flex-wrap justify-center">
  {filteredAliens.map((alien, index) => (
    <div className="m-4"  key={index} style={{maxWidth: '300px'}}>
      <AlienCard  alien={alien} />
    </div>
  ))}
</div>

  )
}

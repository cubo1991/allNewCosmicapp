import React, { useState } from 'react'
import colors from 'tailwindcss/colors'

export const AlienCard = ({key, alien}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const difficultyColor = {
    'Green': 'bg-green-500',
    'Yellow': 'bg-yellow-500',
    'Red': 'bg-red-500'
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white">
      {alien && (
        <table className="w-full">
          <tr>
            <td className="w-2/3">
              <h2 className=" mt-2 text-2xl font-bold">{alien.Nombre}</h2>
            </td>
            <td className="w-1/3 flex justify-end items-center">
              <span className={`h-4 w-4 rounded-full ${difficultyColor[alien.Dificultad]}`}></span>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
            <h3 className="font-bold text-lg">{alien.Poder}</h3>
              <p className={`overflow-hidden ${isExpanded ? '' : 'max-h-14'}`}>{alien.Descripción? alien.Descripción : 'Chupala, no me voy a poner a llenar manualmente este poder'}</p>
              <button onClick={handleExpandClick} className="text-blue-500 mt-2">{isExpanded ? 'Ver menos' : 'Ver más'}</button>
            </td>
          </tr>
        </table>
      )}
    </div>
  )
}

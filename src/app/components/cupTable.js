// CupTable.js
import React,{useEffect} from 'react';

const CupTable = ({ cup, updatePodio, podio }) => {
 
  useEffect(() => {
    if (cup && cup.partidaActual > 10) {
      let jugadoresConPuntos = cup.jugadores.map(jugador => ({
        ...jugador,
        totalPuntos: Object.values(jugador.puntos || {}).reduce((a, b) => a + b, 0),
      }));
      jugadoresConPuntos.sort((a, b) => b.totalPuntos - a.totalPuntos);
  
      // Sólo llama a updatePodio si los primeros tres jugadores han cambiado
      if (
        !podio.primero || !podio.segundo || !podio.tercero ||
        podio.primero.id !== jugadoresConPuntos[0].id ||
        podio.segundo.id !== jugadoresConPuntos[1].id ||
        podio.tercero.id !== jugadoresConPuntos[2].id
      ) {
        updatePodio(jugadoresConPuntos[0], jugadoresConPuntos[1], jugadoresConPuntos[2], true); // Pasa true para el parámetro end
      }
    }
  }, [cup, updatePodio, podio]); 

  
  return (
    cup ?
    <div style={{ overflowX: 'auto' }}> {/* Envuelve la tabla en un div con overflowX: 'auto' */}
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Jugadores / Partidas</th>
            {Array.from({length: 10}, (_, i) => i + 1).map(num => (
              <th key={num} className="px-4 py-2">Partida {num}</th>
            ))}
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cup.jugadores.map((jugador, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
              <td className="border px-4 py-2">{jugador.apodo || jugador.nombre}</td>
              {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                <td key={num} className="border px-4 py-2">
                  {jugador.puntos && jugador.puntos[num] !== undefined ? (
                    jugador.puntos[num]
                  ) : (
                    '-'
                  )}
                </td>
              ))}
              <td className="border px-4 py-2">
                {
                  Object.values(jugador.puntos || {}).reduce((a, b) => a + b, 0)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    :
   ( <p>Cargando...</p>
  ))
};

export default CupTable;

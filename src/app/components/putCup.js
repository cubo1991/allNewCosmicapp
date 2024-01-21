import React from 'react'

const PutCup = ({ cup, gameData, handleInputChange, handleSubmit }) => {
  return (
    <div className="overflow-x-auto">
      {cup.partidaActual > 10 ? (
        <p>Esta copa finalizó</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Jugadores</th>
                <th className="px-4 py-2">Partida Actual: {cup.partidaActual}</th>
              </tr>
            </thead>
            <tbody>
              {cup.jugadores.map((jugador, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                  <td className="border px-4 py-2">{jugador.apodo || jugador.nombre}</td>
                  <td className="border px-4 py-2">
                    <label>CI: </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      onChange={(e) => handleInputChange(e, jugador.id, 'CI')}
                      value={gameData[jugador.id]?.CI || ""}
                      readOnly={cup.finalizada}
                    />
                    <label>CE: </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      onChange={(e) => handleInputChange(e, jugador.id, 'CE')}
                      value={gameData[jugador.id]?.CE || ""}
                      readOnly={cup.finalizada}
                    />
                    <label>Ganó: </label>
                    <input
                      type="checkbox"
                      onChange={(e) => handleInputChange(e, jugador.id, 'win')}
                      checked={gameData[jugador.id]?.win || false}
                      readOnly={cup.finalizada}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!cup.finalizada && <button type="submit">Submit</button>}
        </form>
      )}
    </div>
  );
};

export default PutCup

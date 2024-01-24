import React from 'react'

const Stats = ({users}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Jugadas</th>
            <th className="py-3 px-6 text-left">Victorias</th>
            <th className="py-3 px-6 text-left">Colonias</th>
            <th className="py-3 px-6 text-left">Promedio de Colonias</th>
            <th className="py-3 px-6 text-left">Cantidad de Colonias</th>
            <th className="py-3 px-6 text-left">Cantidad de Copas</th>
            <th className="py-3 px-6 text-left">Cantidad de Campañas</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users && users.map((user, index) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
              <td className="py-3 px-6 text-left">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.jugadas}</td>
              <td className="py-3 px-6 text-left">{user.victorias}</td>
              <td className="py-3 px-6 text-left">{user.colonias}</td>
              <td className="py-3 px-6 text-left">{user.jugadas ? (user.colonias / user.jugadas).toFixed(2) : 0}</td>
              <td className="py-3 px-6 text-left">{user.colonias}</td>
              <td className="py-3 px-6 text-left">{user.cantidadCopas}</td>
              <td className="py-3 px-6 text-left">{user.cantidadCampañas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Stats
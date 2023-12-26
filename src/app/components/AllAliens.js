'use client'
import React, { useState } from 'react'

export const AllAliens = ({ allAliens }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="p-6">
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="Buscar..."
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Dificultad</th>
            <th className="border px-4 py-2">Poder</th>
            <th className="border px-4 py-2">Expansión</th>
            <th className="border px-4 py-2">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {allAliens.filter((alien) => {
            if (searchTerm === '') {
              return alien
            } else if (
              alien.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return alien
            }
          }).map((alien, key) => (
            <tr key={key}>
              <td className="border px-4 py-2">{alien.Nombre}</td>
              <td className="border px-4 py-2">{alien.Dificultad}</td>
              <td className="border px-4 py-2">{alien.Poder}</td>
              <td className="border px-4 py-2">{alien.Expansión}</td>
              <td className="border px-4 py-2">{alien.Descripción}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

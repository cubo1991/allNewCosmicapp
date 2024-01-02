import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

export const AllAliens = ({ allAliens }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 5

  const aliensToShow = allAliens
    .filter((alien) => {
      if (alien && searchTerm === '') {
        return alien
      } else if (
        alien.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return alien
      }
    })
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const pageCount = Math.ceil(allAliens.length / itemsPerPage)

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage)
  }

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
          {aliensToShow.map((alien, key) => (
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
      <ReactPaginate
  previousLabel={'Anterior'}
  nextLabel={'Siguiente'}
  pageCount={pageCount}
  onPageChange={handlePageClick}
  containerClassName={'flex justify-center my-4'}
  pageLinkClassName={'mx-1 px-3 py-2 bg-white border border-gray-300 rounded text-blue-700 hover:bg-blue-500 hover:text-white'}
  previousLinkClassName={'mx-1 px-3 py-2 bg-white border border-gray-300 rounded text-blue-700 hover:bg-blue-500 hover:text-white'}
  nextLinkClassName={'mx-1 px-3 py-2 bg-white border border-gray-300 rounded text-blue-700 hover:bg-blue-500 hover:text-white'}
  disabledClassName={'opacity-50 cursor-not-allowed'}
  activeClassName={'bg-blue-500 text-white'}
/>

    </div>
  )
}

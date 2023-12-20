import React from 'react'

export const Navbar = () => {
  return (
    <nav class="flex items-center justify-between p-6 bg-blue-500">
  <a href="/home" class="text-white text-lg font-bold">Home</a>
  <button class="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded">
    Iniciar Sesión
  </button>
</nav>

  )
}

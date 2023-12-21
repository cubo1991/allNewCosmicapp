import React from 'react'
import { SignIn } from './SignIn'




export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500">
  <a href="/home" class="text-white text-lg font-bold">Home</a>
<SignIn/>
</nav>

  )
}

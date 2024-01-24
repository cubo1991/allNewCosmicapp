
import React from 'react'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'




export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500">
  <a href="/" className="text-white text-lg font-bold">Home</a>
  <div>
<SignIn/>
<SignUp/>
  </div>
</nav>

  )
}

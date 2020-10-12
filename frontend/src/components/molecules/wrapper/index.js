import React from 'react'
import { Navbar } from '../../atoms'

const Wrapper = ({ children }) => (
  <div className="w-full bg-gray-100 h-screen mx-auto">
    <Navbar />

    {children}
  </div>
)

export default Wrapper

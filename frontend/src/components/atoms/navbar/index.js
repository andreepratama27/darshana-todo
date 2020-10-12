import React, { useContext } from 'react'
import { navigate, useLocation } from '@reach/router'
import { IoIosPerson, IoIosArrowBack } from 'react-icons/io'
import { AuthContext } from '../../../context/AuthContext'

const Navbar = () => {
  const location = useLocation()
  const [state] = useContext(AuthContext)
  const navigateLink = () => navigate('/profile')

  const isHome = ['/'].includes(location.pathname)

  const goBackHome = () => navigate('/')

  return (
    <nav className="bg-red-500 flex flex-row  text-center p-4 relative">
      <div className="w-1/2 mx-auto flex flex-row justify-center items-center text-center relative">
        {!isHome && (
          <div className="absolute left-0" onClick={goBackHome}>
            <IoIosArrowBack size={24} className="text-white" />
          </div>
        )}

        <p className="text-white font-bold">Todo List</p>

        {state.token && (
          <div
            onClick={navigateLink}
            className="absolute right-0 p-2 bg-white rounded-full"
          >
            <IoIosPerson />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

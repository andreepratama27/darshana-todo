import React, { useContext } from 'react'
import { useNavigate } from '@reach/router'
import { AuthContext } from '../../context/AuthContext'

const Profile = (props) => {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(AuthContext)

  const userData = JSON.parse(state.user)

  const handleLogout = () => {
    navigate('/')
    dispatch({ type: 'SET_LOGOUT' })
  }

  return (
    <div className="w-1/2 mx-auto">
      <div className="w-full h-24 bg-white p-4">
        <h1>
          Hi, <strong>{userData?.name}</strong>
        </h1>

        <div className="w-full flex justify-center">
          <div className="w-20 h-20 border-4 border-gray-300 rounded-full bg-white">
            <img
              src={`https://api.adorable.io/avatars/285/${userData?.email}.png`}
              className="w-full h-full rounded-full bg-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-end h-64">
        <button
          className="w-full bg-white text-red-500 shadow-md font-bold py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile

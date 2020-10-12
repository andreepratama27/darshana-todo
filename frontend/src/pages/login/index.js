import React, { useEffect, useState } from 'react'
import { Input } from '../../components/atoms'
import { Wrapper } from '../../components/molecules'
import { useLoginRegister } from '../../hooks/loginRegister.hooks'
import { ToastContainer } from 'react-toastify'

const Login = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [{ data }, { onSubmit, onChange }] = useLoginRegister({ isRegister })

  const handleState = () => setIsRegister(!isRegister)

  return (
    <Wrapper>
      <section className="w-1/2 mx-auto p-4 h-screen bg-gray-100">
        {isRegister ? (
          <strong>Register new account</strong>
        ) : (
          <strong>Login using your account</strong>
        )}

        <form onSubmit={onSubmit}>
          {isRegister && (
            <section className="my-4">
              <label>Name</label>
              <Input
                name="name"
                placeholder="Insert your name"
                onChange={onChange}
              />
            </section>
          )}

          <section className="my-4">
            <label>Email</label>
            <Input
              name="email"
              placeholder="Insert your email"
              onChange={onChange}
            />
          </section>

          <section className="my-4">
            <label>Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Insert your email"
              onChange={onChange}
            />
          </section>

          <section className="my-8 mb-4">
            <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-md">
              {isRegister ? 'Register' : 'Login'}
            </button>
          </section>
        </form>

        {isRegister ? (
          <p>
            Dont have an account?{' '}
            <a href="#" onClick={handleState}>
              Login
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <a href="#" onClick={handleState}>
              Register here
            </a>
          </p>
        )}
      </section>

      <ToastContainer />
    </Wrapper>
  )
}

export default Login

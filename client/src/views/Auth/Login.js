import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { axiosInstance } from '../../axios'
import useAuth from '../../hooks/useAuth'

export default function Login() {

    const { setAccessToken, setCSRFToken } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const fromLocation = location?.state?.from?.pathname || '/'
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/login', JSON.stringify({
                email,
                password
            }))

            setAccessToken(response?.data?.access_token)
            setCSRFToken(response.headers["x-csrftoken"])
            setEmail()
            setPassword()
            setLoading(false)

            navigate(fromLocation, { replace: true })
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" onChange={onEmailChange} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" onChange={onPasswordChange} />
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

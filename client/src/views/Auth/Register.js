import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axios'

export default function Register() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()

    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordConfirmationChange(event) {
        setPasswordConfirmation(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/register', JSON.stringify({
                username,
                email,
                password,
                password2: passwordConfirmation
            }))

            setEmail()
            setPassword()
            setUsername()
            setPasswordConfirmation()
            setLoading(false)

            navigate('/auth/login')
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
    }

    return (
        <div className='container'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input type="text" placeholder='Username' autoComplete='off' className='form-control' id='username' onChange={onUsernameChange} />
                </div>
                <div className="mb-3">
                    <input type="email" placeholder='Email' autoComplete='off' className='form-control' id="email" onChange={onEmailChange} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Password' autoComplete='off' className='form-control' id="password" onChange={onPasswordChange} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder='Confirm Password' autoComplete='off' className='form-control' id="passwordConfirmation" onChange={onPasswordConfirmationChange} />
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

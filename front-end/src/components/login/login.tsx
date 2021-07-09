import React, { useState } from 'react';
import { onLogin } from '../../actions/index'
import {Link} from 'react-router-dom'

const Login = () => {

    const [{ username, password }, setCredentials] = useState({
        username: '',
        password: '',
    })

    const [error, setError] = useState('')

    const log = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await onLogin({
            username,
            password
        })
        if (response && response.error) {
            setError(response.error)
        }
    }

    return (
        <div>
            <Link to="/home">Home</Link>
            <form onSubmit={(e) => { log(e) }}>
                <label placeholder="username">Username</label>
                <input placeholder="Username" value={username} onChange={(e) => {
                    setCredentials({
                        username: e.target.value,
                        password
                    })
                }} />
                <label htmlFor="password">Password</label>
                <input placeholder="Password" type="password" value={password} onChange={(e) => {
                    setCredentials({
                        username,
                        password: e.target.value,
                    })
                }} />
                <button type="submit">Ingresar</button>
                {error.length > 0 && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login
import React, {useState} from 'react';

const Login = () => {

    const [{username, password}, setCredentials] = useState({
        username: '',
        password: '',
    })

    return (
        <form>
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
            <button type="submit">Login</button>
        </form>

    )
}

export default Login
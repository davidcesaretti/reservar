import React, { useState } from 'react';
import { onLogin } from '../../actions/index'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login';

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

    const responseGoogle = (response) => {
        console.log(response)
        console.log(response.profileObj)
    }


    const responseFacebook = (response) => {
        console.log(response)
    }

    return (
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
            <GoogleLogin
                clientId="283885012153-bsj812gn457gvnqnoq6u1p2oup9t1304.apps.googleusercontent.com"
                buttonText="Iniciar Sesión con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="516762732768499"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Iniciar sesión"
                icon="fa-facebook"
            />
        </form>

    )
}

export default Login
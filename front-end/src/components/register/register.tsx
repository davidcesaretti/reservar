import React from 'react';

const Register = () => {
    return  (
        <div>
            <h1>Te damos la bienvenida a Reservar</h1>
            <h2>Crea una cuenta</h2>
            <input placeholder="Escribe tu correo electrónico" />
            <div>
                <button>Soy Viajero</button>
                <button>Soy Host</button>
            </div>
            <button>Registrarme</button>
            <div>
                <button>Continuar con Facebook</button>
                <button>Continuar con Google</button>
            </div>
            <span>Ya tienes una cuenta? Ingresa <a href="https://localhost:3000/login">AQUI</a></span>
        </div>
    )
}

export default Register
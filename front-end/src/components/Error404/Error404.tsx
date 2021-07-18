import React from 'react'
import style from './Error404.module.css'

const Error404 = () => {
    return (
        <div className={style.container404}>
            <h2 className={style.titleError}>ERROR 404</h2>
            <h3 className={style.str404}>UPS! That’s an error</h3>
        </div>
    )
}

export default Error404

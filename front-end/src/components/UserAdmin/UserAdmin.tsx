import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useAuth} from '../../firebase/index'

const UserAdmin = () => {

    const auth = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        
    }, [dispatch])

    return (
        <div>
            ACA ESTA EL DETALLE DE UN USUARIO Y LA OPCION DE HACERLO MODERADOR O ELIMINARLO DE LA DB
        </div>
    )
}

export default UserAdmin
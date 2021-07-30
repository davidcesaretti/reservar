import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import { useAuth } from '../../firebase/index'
import { getCodeValidation } from '../../actions/index'
import style from './ValidationAdmin.module.css'
import logo from "../../Image/trekker.svg";

const ValidationAdmin = () => {
    const auth = useAuth()
    const dispatch = useDispatch()
    const history = useHistory()
    const code = useSelector((state: any) => state.logAdmin)

    const [codes, setCodes] = useState(0)
    const [contFails, setContFails] = useState(0)
    const [validate, setValidate] = useState(false)
    const [input, setInput] = useState(0)
    const email = auth?.user?.email
    useEffect(() => {
        if (codes === 0) dispatch(getCodeValidation(email))
        setCodes(codes+1)
    }, [validate])

    const handleClick = (e) => {
        e.preventDefault()
        if (input == code) {
            setValidate(!validate)
            return
        }

        setContFails(contFails + 1)
        if (contFails === 2) {
            alert('Failed! You are being redirected to home')
            auth.signout()
            history.push('/')
        }
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const logOut = () => {
        auth.signout()
        history.push('/')
    }
    return (

        <div>
            {(validate === false) ?
                <div className={style.ctn}>
                    <div className={style.navBar}>
                        <img src={logo} alt="trekker" width="150px" height="60px" />
                        <h1 className={style.title}>ADMIN</h1>
                        <button className={style.logOut} onClick={() => logOut()}>Sign Out </button>
                    </div>
                    <form className={style.form}>
                        <label className={style.label}>Please insert the code: ({contFails + 1}/3 attemps)</label>
                        <input className={style.input} placeholder="Insert the code" name="code" type="password" onChange={(e) => { handleChange(e) }} />
                        <button className={style.button} type="submit" onClick={(e) => { handleClick(e) }}>Send</button>
                    </form>
                    <div className={style.footer}>Copyright</div>
                </div>
                :
                <AdminDashboard />
            }
        </div>
    )
}

export default ValidationAdmin
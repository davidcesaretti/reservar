import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import {useAuth} from '../../firebase/index'

const ValidationAdmin = () => {
    const auth = useAuth()
    const dispatch = useDispatch()
    const history = useHistory()


    const [contFails, setContFails] = useState(0)
    const [validate, setValidate] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        if (contFails === 2) {
            auth.signOut()
            history.push('/')
        }
        setContFails(contFails + 1)
    }

    return (

        <div>
            { (validate === false) ?
            <form>
                <label>Please insert the code: ({contFails+1}/3 attemps)</label>
                <input name="code" type="password"/>
                <button type="submit" onClick={(e) => {handleClick(e)}}>Send</button>
            </form>
            :
            <AdminDashboard />
            }
        </div>
    )
}

export default ValidationAdmin
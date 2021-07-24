import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useAuth } from "../../firebase/index";
import style from './AdminDashboard.module.css'
import UsersList from '../UsersList/UsersList'
import PublicationsList from '../PublicationsList/PublicationsList'
import Reports from '../Reports/Reports'


const AdminDashboard = () => {
    const auth = useAuth();
    const dispatch = useDispatch()
    const [section, setSection] = useState('')

    const clickUserList = () => {
        setSection('UsersList')
    }

    const clickPublicationsList = () => {
        setSection('PublicationsList')
    }

    const clickReports = () => {
        setSection('Reports')
    }

    return (
        <div className={style.ctn}>
            <nav className={style.navBar}>
                <button onClick={() => {clickUserList()}} className={style.buttonNav}>User List</button>
                <button onClick={() => {clickPublicationsList()}} className={style.buttonNav}>Publications List</button>
                <button onClick={() => {clickReports()}} className={style.buttonNav}>Reports</button>
            </nav>
            { section === 'Reports' ?
            <Reports /> :

            section === 'UsersList' ? 
            <UsersList /> : 

            section === 'PublicationsList' ? 

            <PublicationsList /> :
            <div className={style.landing}>
                <div className={style.img}>

                </div>
            </div>
            }
        </div>
    )
}

export default AdminDashboard
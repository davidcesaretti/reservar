import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from "../../firebase/index";
import style from './User.module.css'
import Profile from '../Profile/Profile'
import UpdateProfile from '../UpdateProfile/UpdateProfile'
import Bookings from '../Bookings/Bookings'
import Favourites from '../Favourites/Favourites'
import HistoryTravels from '../HistoryTravels/HistoryTravels'

const User = () => {
    const auth = useAuth()
    const [section, setSection] = useState('Profile')

    const clickProfile = () => {
        setSection('Profile')
    }

    const clickUpdate = () => {
        setSection('Update')
    }

    const clickBookings = () => {
        setSection('Bookings')
    }

    const clickFavourites = () => {
        setSection('Favourites')
    }

    const clickHistoryTravels = () => {
        setSection('History')
    }

    return (
        <div>
            <div className={style.navBar}>
                <div >
                    <img className={style.picture} src={auth.user.photoURL} alt="profile"/>
                </div>
                <div className={style.menu}>
                    <div className={style.title}>
                        <h4 className={style.bienvenida}>Bienvenido {auth.user.displayName}</h4>
                        <div className={style.buttonsNavBar}>
                            <Link to="/" className={style.navButton1}>Home</Link>
                            <div className={style.line}></div>
                            <Link to="/categories" className={style.navButton}>Categories</Link>
                        </div>
                    </div>
                    <div className={style.separator}></div>
                    <nav className={style.options}>
                            <button className={style.buttonOption}
                                onClick={(e) => {clickProfile()}}
                            >
                                Profile
                            </button>
                            <div className={style.line}></div>
                            <button className={style.buttonOption}
                                onClick={(e) => {clickUpdate()}}
                            >
                                Edit profile
                            </button>
                            <div className={style.line}></div>
                            <button className={style.buttonOption}
                                onClick={() => {clickBookings()}}
                            >
                                My bookings
                            </button>
                            <div className={style.line}></div>
                            <button className={style.buttonOption}
                                onClick={() => {clickFavourites()}}
                            >
                                Favourites
                            </button>
                            <div className={style.line}></div>
                            <button className={style.buttonOption}
                                onClick={() => {clickHistoryTravels()}}
                            >
                                History of travels
                            </button>
                            <div className={style.line}></div>
                            <button className={style.buttonOption} 
                                onClick={() => auth.signout()}
                            >
                                Signout
                            </button>
                    </nav>
                </div>
            </div>
            {   section === 'Profile' ? <Profile /> :
                section === 'Update' ? <UpdateProfile /> :
                section === 'Bookings' ? <Bookings /> :
                section === 'Favourites' ? <Favourites /> :
                <HistoryTravels />
            }
            <div className={style.footer}>
                <p className={style.infoFooter}>COPYRIGHT 2021</p>
            </div>
        </div>
    )
}

export default User

import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useAuth } from "../../firebase/index";
import style from './AdminDashboard.module.css'
import RegisteredUsers from '../RegisteredUsers/RegisteredUsers'
import RegisteredLodgings from '../RegisteredLodgings/RegisteredLodgings'
import Reviews from '../Reviews/Reviews'
import FAQ from '../FAQ/FAQ'
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions'
import Earnings from '../Earnings/Earnings'
import Stats from '../Stats/Stats'
import GeneralBalance from '../GeneralBalance/GeneralBalance'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'


const AdminDashboard = () => {
    const auth = useAuth();
    const dispatch = useDispatch()
    const [section, setSection] = useState('')

    const handleClick = (e) => {
        setSection(e.target.name)
    }


    return (
        <div className={style.ctn}>
            <div className={style.navBar}>
                <img className={style.logo} alt="trekker" />
                <h1 className={style.title} >ADMIN PANEL</h1>
                <button className={style.signOut} >Sign Out</button>
            </div> 
            { section === 'Reviews' ?
            <Reviews setSection={setSection}/> :

            section === 'RegisteredUsers' ?
            <RegisteredUsers setSection={setSection}/> :

            section === 'RegisteredLodgings' ?
            <RegisteredLodgings setSection={setSection}/> :
            
            section === 'GeneralBalance' ?
            <GeneralBalance setSection={setSection}/> :

            section === 'Earnings' ?
            <Earnings setSection={setSection}/> :

            section === 'Stats' ?
            <Stats setSection={setSection}/> :

            section === 'TermsAndConditions' ?
            <TermsAndConditions setSection={setSection}/> :

            section === 'FAQ' ?
            <FAQ setSection={setSection}/> :

            section === 'PrivacyPolicy' ?
            <PrivacyPolicy setSection={setSection}/> :

            <nav className={style.buttons}>
                <button name="RegisteredUsers" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Registered Users
                </button>
                <button name="RegisteredLodgings" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Registered Lodgings
                </button>
                <button name="Reviews" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Reviews
                </button>
                <button name="GeneralBalance" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    General Balance
                </button>
                <button name="Earnings" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Earnings
                </button>
                <button name="Stats" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Stats
                </button>
                <button name="TermsAndConditions" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Terms And Conditions
                </button>
                <button name="FAQ" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    FAQ
                </button>
                <button name="PrivacyPolicy" onClick={(e) => {handleClick(e)}} className={style.buttonNav}>
                    Privacy Policy
                </button>
            </nav>
            }
            <div className={style.footer}>Copyright 2021</div>
        </div>
    )
}

export default AdminDashboard
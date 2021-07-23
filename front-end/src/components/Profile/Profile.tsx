import React from 'react'
import { useAuth } from "../../firebase/index";
import style from "./Profile.module.css";


const Profile = (
    {   name,
        alternative_email,
        phone_number,
        identity_document_type,
        identity_document_number,
        nationality,
        date_birth,
        residence_address,
        city_and_country_of_residence,
        emergency_phone_number,
        emergency_contact,
        relationship,
        userType,
        setUserType }
) => {
    const auth = useAuth()
    return (
        <div className={style.ctn}>
            <div className={style.information}>
                <div>Name: {name}</div>
                <div>Email: {auth.user.email}</div>
                <div>Alternative Email: {alternative_email}</div>
                <div>Phone Number: {phone_number}</div>
                <div>Identity Document Type: {identity_document_type}</div>
                <div>Identity Document Number: {identity_document_number}</div>
                <div>Nationality: {nationality}</div>
                <div>Birth Day: {date_birth?.slice(0, 10)}</div>
                <div>Residence Address: {residence_address}</div>
                <div>City and Country of Residence: {city_and_country_of_residence}</div>
                <div>Emergency Phone Number: {emergency_phone_number}</div>
                <div>Emergency Email: {emergency_contact}</div>
                <div>Relationship of Contact: {relationship}</div>
            </div>
            <div className={style.userType}>
                {userType === "Traveller" ?
                    <div>
                        <div className={style.imgHost}>
                            <h1 className={style.title}>Do you want to access the host panel?</h1>
                        </div>
                        <button className={style.button} onClick={() => setUserType("Host")}>HOST</button>
                    </div>
                    :
                    <div>
                        <div className={style.imgHost}>
                            <h1 className={style.title}>Go back to traveler panel?</h1>
                        </div>
                        <button className={style.button} onClick={() => setUserType("Traveller")}>Traveller</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile
import React from 'react'
import { useAuth } from "../../firebase/index";
import style from "./Profile.module.css";


const Profile = (
    { name,
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
                <div className={style.user}>
                    <div className={style.prop}><b>Name: </b>{name}</div>
                    <div className={style.prop}><b>Email: </b>{auth.user.email}</div>
                    <div className={style.prop}><b>Alternative Email: </b>{alternative_email}</div>
                    <div className={style.prop}><b>Phone Number: </b>+{phone_number}</div>
                    <div className={style.prop}><b>Identity Document Type: </b>{identity_document_type}</div>
                    <div className={style.prop}><b>Identity Document Number: </b>{identity_document_number}</div>
                    <div className={style.prop}><b>Nationality: </b>{nationality}</div>
                    <div className={style.prop}><b>Birth Day: </b>{date_birth?.slice(0, 10)}</div>
                    <div className={style.prop}><b>Residence Address: </b>{residence_address}</div>
                    <div className={style.prop}><b>City and Country of Residence: </b>{city_and_country_of_residence}</div>
                    <div className={style.prop}><b>Emergency Phone Number: </b>+{emergency_phone_number}</div>
                    <div className={style.prop}><b>Emergency Email: </b>{emergency_contact}</div>
                    <div className={style.prop}><b>Relationship of Contact: </b>{relationship}</div>
                </div>
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
                        <div className={style.imgTravellers}>
                            <h1 className={style.title}>Go back to traveler panel?</h1>
                        </div>
                        <button className={style.buttonHost} onClick={() => setUserType("Traveller")}>TRAVELLER</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile
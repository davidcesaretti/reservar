import React from 'react'
import { useAuth } from "../../firebase/index";

const Profile = (userInfo) => {
    const auth = useAuth()
    console.log('profile component ',userInfo)
    return (
        <div>
            <div>Name: {userInfo.name}</div>
            <div>Email: {auth.user.email}</div>
            <div>Alternative Email: {userInfo.alternative_email}</div>
            <div>Phone Number: {userInfo.phone_number}</div>
            <div>Identity Document Type: {userInfo.identity_document_type}</div>
            <div>Identity Document Number: {userInfo.identity_document_number}</div>
            <div>Nationality: {userInfo.nationality}</div>
            <div>Birth Day: {userInfo.date_birth?.slice(0, 10)}</div>
            <div>Residence Address: {userInfo.residence_address}</div>
            <div>City and Country of Residence: {userInfo.city_and_country_of_residence}</div>
            <div>Emergency Phone Number: {userInfo.emergency_phone_number}</div>
            <div>Emergency Email: {userInfo.emergency_contact}</div>
            <div>Relationship of Contact: {userInfo.relationship}</div>
        </div>
    )
}

export default Profile
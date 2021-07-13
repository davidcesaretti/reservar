import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from "react-router"
import { detailHotel } from '../../actions';



const DetailHotel = () => {
    const detailhotel = useSelector((state: any) => state.categorieDetail)
    const [state, setState] = useState()
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(detailHotel(id))
    },[])
    return (
        <div>
            <div>Name {detailhotel.name}</div>
            <div>Amenities {detailhotel.amenities}</div>
            <div>Summary {detailhotel.summary}</div>
            <div>Type {detailhotel.type}</div>
            <div>Accommodates {detailhotel.accommodates}</div>
            <div>Beds {detailhotel.beds}</div>
            <div>Bedrooms {detailhotel.bedrooms}</div>
            <div>Bathrooms {detailhotel.bathrooms}</div>
            <div>Price {detailhotel.price}</div>
            <img src={detailhotel.image} alt="No image"/>
            <div>Score {detailhotel.score}</div>
            <div>Address {detailhotel.address}</div>
        </div>
    )

}

export default DetailHotel;
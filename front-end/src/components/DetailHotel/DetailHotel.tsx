import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from "react-router"
import { detailHotel } from '../../actions';



const DetailHotel = () => {
    const detailhotel = useSelector((state: any) => state.categorieDetail)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(detailHotel(id))
    },[])
    return (
        <div>
            <div>Name {detailhotel[0]?.name}</div>
            <div>Amenities {detailhotel[0]?.amenities}</div>
            <div>Summary {detailhotel[0]?.summary}</div>
            <div>Type {detailhotel[0]?.type}</div>
            <div>Accommodates {detailhotel[0]?.accommodates}</div>
            <div>Beds {detailhotel[0]?.beds}</div>
            <div>Bedrooms {detailhotel[0]?.bedrooms}</div>
            <div>Bathrooms {detailhotel[0]?.bathrooms}</div>
            <div>Price {detailhotel[0]?.price}</div>
            <img src={detailhotel[0]?.image} alt="No image"/>
            <div>Score {detailhotel[0]?.score}</div>
            <div>Address {detailhotel[0]?.address}</div>
        </div>
    )

}

export default DetailHotel;
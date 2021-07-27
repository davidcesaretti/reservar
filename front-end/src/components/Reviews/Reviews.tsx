import React from 'react'

const Reviews = ({setSection}) => {
    return (
        <div>
            <button onClick={() => {setSection('')}}>Back</button>
            REPORTS DE COMENTARIOS
        </div>
    )
}

export default Reviews
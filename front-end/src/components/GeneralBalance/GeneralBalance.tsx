import React from 'react'

const GeneralBalance = ({setSection}) => {
    return (
        <div>
            <button onClick={() => {setSection('')}}>Back</button>
            ESTO ES EL BALANCE GENERAL
        </div>
    )
}

export default GeneralBalance
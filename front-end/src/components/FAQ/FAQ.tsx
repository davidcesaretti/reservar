import React from 'react'

const FAQ = ({setSection}) => {
    return (
        <div>
            <button onClick={() => {setSection('')}}>Back</button>
            ESTO ES FAQ
        </div>
    )
}

export default FAQ
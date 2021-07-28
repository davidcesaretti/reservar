import React from 'react'

const Stats = ({setSection}) => {
    return (
        <div>
            <button onClick={() => {setSection('')}}>Back</button>
            ESTO ES STATS
        </div>
    )
}

export default Stats
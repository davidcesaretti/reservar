import React from 'react'
import style from './Spinner.module.css'


function Spinner() {
    return (
        <div>
            <h2 className={style.titleSpinner} >LOADING...</h2>
            
            <div className={style.spinner}>
                <div className={style.doubleBounce1}></div>
                <div className={style.doubleBounce2}></div>
            </div>
        </div>
    )
}

export default Spinner;
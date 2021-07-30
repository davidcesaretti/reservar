import React from 'react'
import style from './GeneralBalance.module.css'

const GeneralBalance = () => {
    return (
        <div>
            <button className={style.backButton} >⮜ Back</button>
            <h2 className={style.title}>Balance Sheet</h2>

            <div className={style.ctnOut}>
                <div className={style.ctnIn}>
                    <div className={style.field}>
                        <h2 className={style.titleField}>EARNINGS</h2>
                        <h4 className={style.numberField}>$12000 USD</h4>
                        <p className={style.footerField}>Update monthly</p>
                    </div>
                    <div className={style.field}>
                        <h2 className={style.titleField}>USERS</h2>
                        <h4 className={style.numberField}>1520</h4>
                        <p className={style.footerField}>Update monthly</p>
                    </div>
                    <div className={style.field}>
                        <h2 className={style.titleField}>LODGINGS</h2>
                        <h4 className={style.numberField}>260</h4>
                        <p className={style.footerField}>Update monthly</p>
                    </div>
                    <div className={style.field}>
                        <h2 className={style.titleField}>BOOKINGS COMPLETED</h2>
                        <h4 className={style.numberField}>845</h4>
                        <p className={style.footerField}>Update monthly</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralBalance
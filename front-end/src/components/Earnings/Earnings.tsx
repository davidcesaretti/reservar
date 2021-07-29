import React from 'react'
import style from "./Earnings.module.css"
import DatePicker from "react-datepicker";

const Earnings = ({setSection}) => {
    return (
        <div>
            <button onClick={() => {setSection('')}}>Back</button>
             <div>
             <form id="form">
                 <section className={style.formfieldsection}>
                       <h2 className={style.formsectiontitle}>Earnings</h2>
                 </section>
                 <br></br>
                 <section>
                       <h2 className={style.formsectiontitle}>Current month:</h2>
                       <input name="expected-hourly-rate" type="text"/>
                 </section>
                    <div>
                        <div className={style.card }>
                            <label>GROSS INCOME</label>
                            <input name="expected-hourly-rate" type="text"/>
                            <label>Update daily</label>
                        </div>
                        <div className={style.card}>
                            <label>10% NET INCOME</label>
                            <input name="expected-hourly-rate" type="text"/>
                            <label>Update daily</label>
                        </div>
                    </div>
                       
           
                 <section className={style.formfieldsection}>
                    </section>
                    <section >
                    <label className={style.formlabel}>Earnings History</label>
                    <br></br>
                    <div>
                        <label>Start Date</label>
                        <input name="emp1-start-date" type="date" />
                        <label >End Date</label>
                        <input name="emp1-end-date" type="date" />    
                                  
                    </div>
                    <div className={style.col3}>
                        <div className={style.card1}></div>
                        
                    </div>
                    <div className={style.col3}>
                        <div className={style.card1}></div>
                       
                    </div>
                    </section>
                 <input type="submit" value="Submit" />
               </form>
             </div>
        </div>
    )
}

export default Earnings
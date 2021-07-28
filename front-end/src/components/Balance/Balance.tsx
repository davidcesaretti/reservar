import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import style from './Balance.module.css'


const Balance = () => {

    const dispatch = useDispatch()
    const [monthInitial, setMonthInitial] = useState('')
    const [yearInitial, setYearInitial] = useState(0)
    const [monthFinal, setMonthFinal] = useState('')
    const [yearFinal, setYearFinal] = useState(0)
    let month = new Date().toLocaleString("en-US", { month: "long" })
    let year = new Date().getFullYear()
    const years = Array.from(new Array(20),( val, index) => index + year);

    const handleInitialMonth = (e) => {
        setMonthInitial(e.target.value)
    }
    const handleInitialYear = (e) => {
        setYearInitial(e.target.value)
    }
    const handleFinalMonth = (e) => {
        setMonthFinal(e.target.value)
    }
    const handleFinalYear = (e) => {
        setYearFinal(e.target.value)
    }

    useEffect(() => {
        
    }, [dispatch])

    const submitHandle = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h1 className={style.title}>BALANCE SHEET</h1>
            <h3 className={style.subTitle1}>Current month: {month} {year}</h3>
            <div className={style.ctnOut}>
                <div className={style.ctnIn}>
                    <div className={style.field}>
                        <h2 className={style.titleField}>GROSS INCOME<span className={style.subTitleField}>(All my properties included)</span></h2>
                        <h4 className={style.numberField}>$3000 USD</h4>
                        <p className={style.footerField}>Update daily</p>
                    </div>
                    <div className={style.field}>
                        <h2 className={style.titleField}>90% NET INCOME</h2>
                        <h4 className={style.numberField}>$2700 USD</h4>
                        <p className={style.footerField}>Update daily</p>
                    </div>
                </div>
            </div>

            <div>
                <h4  className={style.subTitle2}>Earning history</h4>
                <form className={style.form} onSubmit={(e) => {submitHandle(e)}}>
                <div className={style.filters}>
                    <label className={style.filterLabel}>Month:</label>
                    <select onChange={(e) => {handleInitialMonth(e)}} className={style.filterSelect}>
                        <option className={style.options} value='January'>January</option>
                        <option className={style.options} value='February'>February</option>
                        <option className={style.options} value='March'>March</option>
                        <option className={style.options} value='April'>April</option>
                        <option className={style.options} value='May'>May</option>
                        <option className={style.options} value='June'>June</option>
                        <option className={style.options} value='July'>July</option>
                        <option className={style.options} value='August'>August</option>
                        <option className={style.options} value='September'>September</option>
                        <option className={style.options} value='October'>October</option>
                        <option className={style.options} value='November'>November</option>
                        <option className={style.options} value='December'>December</option>
                    </select>
                    <label className={style.filterLabel}>Year:</label>
                    <select onChange={(e) => {handleInitialYear(e)}} className={style.filterSelect}>
                        {
                            years.map((year, index) => {
                                return (<option key={`year${index}`} value={year}>{year}</option>)
                        })
                    }
                    </select>
                    <div className={style.separator}></div>
                    <label className={style.filterLabel}>Month:</label>
                    <select onChange={(e) => {handleFinalMonth(e)}} className={style.filterSelect}>
                        <option className={style.options} value='January'>January</option>
                        <option className={style.options} value='February'>February</option>
                        <option className={style.options} value='March'>March</option>
                        <option className={style.options} value='April'>April</option>
                        <option className={style.options} value='May'>May</option>
                        <option className={style.options} value='June'>June</option>
                        <option className={style.options} value='July'>July</option>
                        <option className={style.options} value='August'>August</option>
                        <option className={style.options} value='September'>September</option>
                        <option className={style.options} value='October'>October</option>
                        <option className={style.options} value='November'>November</option>
                        <option className={style.options} value='December'>December</option>
                    </select>
                    <label className={style.filterLabel}>Year:</label>
                    <select onChange={(e) => {handleFinalYear(e)}} className={style.filterSelect}>
                    {
                            years.map((year, index) => {
                                return (<option key={`year${index}`} value={year}>{year}</option>)
                        })
                    }
                    </select>
                </div>
                <button type="submit" className={style.submit}>Search</button>
                </form>
            </div>

            <div className={style.propertiesData}></div>
        </div>
    )
}


export default Balance
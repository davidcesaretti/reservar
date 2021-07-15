import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {storage} from '../../firebase/index'
import {Link} from 'react-router-dom'
import style from './Perfil.module.css'



const Perfil = () => {
    const dispatch = useDispatch()
    const [info, setInfo] = useState({
        name: '',
        email: '',
        phone: 0,
        dcmType: '',
        dcmNumber: 0,
        nationality: '',
        birthday: '',
        adress: '',
        residence: '',
        emergencyPhone: 0,
        recoveryMail: '',
        civilStatus: ''
    })
    interface userInfo {
        name: string;
        email: string;
        phone: number;
        dcmType: string;
        dcmNumber: number;
        nationality: string;
        birthday: string;
        adress: string;
        residence: string;
        emergencyPhone: number;
        recoveryMail: string;
        civilStatus: string;
    }

    const signOut = () => {

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const handleUpdate = () => {
        if (typeof info.name !== "string" && info.name !== '') {
            alert('write your name, it must be a string')
            return
        }
        if (!emailRegex.test(info.email) && info.email !== '') {
            alert('write a valid email')
            return
        }
        if (info.phone < 1000000 && info.phone !== 0) {
            alert('write your phone number')
            return
        }
        if (typeof info.dcmType !== "string" && info.dcmType !== '') {
            alert('write your document type')
            return
        }
        if (info.dcmNumber < 1000000 && info.dcmNumber !== 0) {
            alert('write your document number')
            return
        }
        if (typeof info.nationality !== "string" && info.nationality !== '') {
            alert('write your nationality')
            return
        }
        if (typeof info.birthday !== "string" && info.birthday !== '') {
            alert('write your birth date')
            return
        }
        if (typeof info.adress !== "string" && info.adress !== '') {
            alert('write your adress')
            return
        }
        if (typeof info.residence !== "string" && info.residence !== '') {
            alert('write your residence')
            return
        }
        if (info.emergencyPhone < 1000000 && info.emergencyPhone !== 0) {
            alert('wirte an alternative phone in case of emergency')
            return
        }
        if (!emailRegex.test(info.email) && info.email !== '') {
            alert('write an alternative mail in case you need to recover your account')
            return
        }
        if (typeof info.civilStatus !== "string" && info.civilStatus !== '') {
            alert('write your civil status')
            return 
        }

    }

    return (
        <div>
            <div className={style.navBar}>
                <div className={style.picture}>
                    <div className={style.image}></div>
                </div>
                <div className={style.menu}>
                    <div className={style.title}>
                        <h4 className={style.bienvenida}>Bienvenido resumenes de anime!</h4>
                        <p className={style.type}>VIAJERO</p>
                    </div>
                    <div className={style.separator}></div>
                    <nav className={style.options}>
                            <Link to="/perfil" className={style.option}>Edit Profile</Link>
                            <div className={style.line}></div>
                            <Link to="/booking" className={style.option}>My Bookings</Link>
                            <div className={style.line}></div>
                            <Link to="/favourites" className={style.option}>Favourites</Link>
                            <div className={style.line}></div>
                            <Link to="/travels" className={style.option}>History of travels</Link>
                            <div className={style.line}></div>
                            <Link to="/privacity" className={style.option}>Privacity</Link>
                            <div className={style.line}></div>
                            <button className={style.buttonOption} 
                                    onClick={() => {
                                        signOut()}
                                    }
                            >
                                        Sign Out
                            </button>
                    </nav>
                </div>
            </div>
            <h2 className={style.header}>My Profile</h2>
            <div className={style.ctn}>
                <div className={style.field}>
                    <label className={style.nameField}>Complete name</label>
                    <input 
                        placeholder="Toni Tralice" 
                        className={style.inputField} 
                        name="name"
                        value={info.name}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Email</label>
                    <input 
                        placeholder="henry@gmail.com" 
                        className={style.inputField}
                        name="email"
                        value={info.email}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Phone number</label>
                    <input 
                        type="tel" 
                        placeholder="+543402538301" 
                        className={style.inputField}
                        name="phone"
                        value={info.phone}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Document type</label>
                    <input 
                        placeholder="DNI" 
                        className={style.inputField}
                        name="dcmType"
                        value={info.dcmType}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Document number</label>
                    <input 
                        placeholder="37594328" 
                        className={style.inputField}
                        name="dcmNumber"
                        value={info.dcmNumber}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Nationality</label>
                    <input 
                        placeholder="Argentina" 
                        className={style.inputField}
                        name="nationality"
                        value={info.nationality}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Date of birth</label>
                    <input 
                        placeholder="04/10/1995" 
                        type="date" 
                        className={style.inputField}
                        name="birthday"
                        value={info.birthday}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Residence address</label>
                    <input 
                        placeholder="Italia 165" 
                        className={style.inputField}
                        name="adress"
                        value={info.adress}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>City and country of residence</label>
                    <input 
                        placeholder="General Lagos, Argentina" 
                        className={style.inputField}
                        name="residence"
                        value={info.residence}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Emergency contact</label>
                    <input 
                        placeholder="+54341598621" 
                        className={style.inputField}
                        name="emergencyPhone"
                        value={info.emergencyPhone}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Recovery mail </label>
                    <input 
                        placeholder="plataforma5@gmail.com" 
                        className={style.inputField} 
                        name="recoveryMail"
                        value={info.recoveryMail}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Civil status</label>
                    <input 
                        placeholder="Married" 
                        className={style.inputField}
                        name="civilStatus"
                        value={info.civilStatus}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
            </div>
            <div className={style.ctnUpdate}>
                <button 
                    className={style.update}
                    onClick={() => {handleUpdate()}}
            >
                Update
            </button>
            </div>
            <div className={style.footer}>
                <p className={style.infoFooter}>COPYRIGHT 2021</p>
            </div>
        </div>
    )

/* 
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "stage_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url)
                    })
            }
        )
    }

    return (
        <div>
            <progress value={progress} max="100" />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    )
}
 */
}
export default Perfil
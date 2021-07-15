import React, {useState} from 'react';
import {storage} from '../../firebase/index'
import {Link} from 'react-router-dom'
import style from './Perfil.module.css'



const Perfil = () => {

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
                            <Link to="" className={style.option}>My Profile</Link>
                            <div className={style.line}></div>
                            <Link to="" className={style.option}>My Bookings</Link>
                            <div className={style.line}></div>
                            <Link to="" className={style.option}>Favourites</Link>
                            <div className={style.line}></div>
                            <Link to="" className={style.option}>History of travels</Link>
                            <div className={style.line}></div>
                            <Link to="" className={style.option}>Privacity</Link>
                            <div className={style.line}></div>
                            <Link to="" className={style.option}>Sign Out</Link>
                    </nav>
                </div>
            </div>
            <h2 className={style.header}>My Profile</h2>
            <div className={style.ctn}>
                <div className={style.field}>
                    <label className={style.nameField}>Complete name</label>
                    <input placeholder="Toni Tralice" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Email</label>
                    <input placeholder="henry@gmail.com" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Phone number</label>
                    <input type="tel" placeholder="+543402538301" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Document type</label>
                    <input placeholder="DNI" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Document number</label>
                    <input placeholder="37594328" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Nationality</label>
                    <input placeholder="Argentina" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Date of birth</label>
                    <input placeholder="04/10/1995" type="date" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Residence address</label>
                    <input placeholder="Italia 165" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>City and country of residence</label>
                    <input placeholder="General Lagos, Argentina" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Emergency contact</label>
                    <input placeholder="+54341598621" className={style.inputField}/>
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Recovery mail </label>
                    <input placeholder="plataforma5@gmail.com" className={style.inputField} />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Civil status</label>
                    <input placeholder="Married" className={style.inputField}/>
                </div>
            </div>
            <div className={style.ctnUpdate}>
                <Link className={style.update}>Update</Link>
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
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {storage} from '../../firebase/index'
import {Link} from 'react-router-dom'
import style from './Perfil.module.css'
import {UserEmailGlobal, updateUser} from '../../actions/index'
import { useAuth } from "../../firebase/index";
import Swal from 'sweetalert2'



const Perfil = () => {
    const auth = useAuth()

    const dispatch = useDispatch()

    const [info, setInfo] = useState({
        name: '',
        recuperation_email: '',
        phone_number: undefined,
        identity_document_type: '',
        identity_document_number: undefined,
        nationality: '',
        date_birth: '',
        residence_address: '',
        city_and_country_of_residence: '',
        emergency_phone_number: undefined,
        emergency_contact: '',
        relationship: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const handleUpdate = (e) => {
        e.preventDefault()

        if (typeof info.name !== "string" && info.name !== '') {
            alert('write your name, it must be a string')
            return
        }
        if (!emailRegex.test(info.recuperation_email) && info.recuperation_email !== '') {
            alert('write a valid email')
            return
        }
        if (info.phone_number < 1000000 && info.phone_number !== 0) {
            alert('write your phone number')
            return
        }
        if (typeof info.identity_document_type !== "string" && info.identity_document_type !== '') {
            alert('write your document type')
            return
        }
        if (info.identity_document_number < 1000000 && info.identity_document_number !== 0) {
            alert('write your document number')
            return
        }
        if (typeof info.nationality !== "string" && info.nationality !== '') {
            alert('write your nationality')
            return
        }
        if (typeof info.date_birth !== "string" && info.date_birth !== '') {
            alert('write your birth date')
            return
        }
        if (typeof info.residence_address !== "string" && info.residence_address !== '') {
            alert('write your adress')
            return
        }
        if (typeof info.city_and_country_of_residence !== "string" && info.city_and_country_of_residence !== '') {
            alert('write your residence')
            return
        }
        if (info.emergency_phone_number < 1000000 && info.emergency_phone_number !== 0) {
            alert('wirte an alternative phone in case of emergency')
            return
        }
        if (!emailRegex.test(info.emergency_contact) && info.emergency_contact !== '') {
            alert('write an alternative mail in case you need to recover your account')
            return
        }
        if (typeof info.relationship !== "string" && info.relationship !== '') {
            alert('write your civil status')
            return
        }

        let userEmail = auth.user.email;

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(updateUser(info, userEmail))
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    }
    return (
        <div>
            <div className={style.navBar}>
                <div >
                    <img className={style.picture} src={auth.user.photoURL} alt="profile"/>
                </div>
                <div className={style.menu}>
                    <div className={style.title}>
                        <h4 className={style.bienvenida}>Bienvenido {auth.user.displayName}</h4>
                        <div className={style.buttonsNavBar}>
                            <Link to="/" className={style.navButton1}>Home</Link>
                            <div className={style.line}></div>
                            <Link to="/categories" className={style.navButton}>Categories</Link>
                        </div>
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
                            <button className={style.buttonOption} onClick={() => auth.signout()}>Signout</button>
                            
                    </nav>
                </div>
            </div>
            <h2 className={style.header}>My Profile</h2>
            <form 
                className={style.ctn}
                onSubmit={(e) => {handleUpdate(e)}}
            >
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
                    <label className={style.nameField}>Recuperation Email</label>
                    <input 
                        placeholder="henry@gmail.com" 
                        className={style.inputField}
                        name="recuperation_email"
                        value={info.recuperation_email}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Phone number</label>
                    <input 
                        type="tel" 
                        placeholder="+543402538301" 
                        className={style.inputField}
                        name="phone_number"
                        value={info.phone_number}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Document type</label>
                    <input 
                        placeholder="DNI" 
                        className={style.inputField}
                        name="identity_document_type"
                        value={info.identity_document_type}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Document number</label>
                    <input 
                        placeholder="37594328" 
                        className={style.inputField}
                        name="identity_document_number"
                        value={info.identity_document_number}
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
                        name="date_birth"
                        value={info.date_birth}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Residence address</label>
                    <input 
                        placeholder="Italia 165" 
                        className={style.inputField}
                        name="residence_address"
                        value={info.residence_address}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>City and country of residence</label>
                    <input 
                        placeholder="General Lagos, Argentina" 
                        className={style.inputField}
                        name="city_and_country_of_residence"
                        value={info.city_and_country_of_residence}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Emergency contact</label>
                    <input 
                        placeholder="+54341598621" 
                        className={style.inputField}
                        name="emergency_phone_number"
                        value={info.emergency_phone_number}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Contact email </label>
                    <input 
                        placeholder="plataforma5@gmail.com" 
                        className={style.inputField} 
                        name="emergency_contact"
                        value={info.emergency_contact}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
                <div className={style.field}>
                    <label className={style.nameField}>Relationship with contact</label>
                    <input 
                        placeholder="Married" 
                        className={style.inputField}
                        name="relationship"
                        value={info.relationship}
                        onChange={(e) => {handleChange(e)}}
                />
                </div>
            <div className={style.ctnUpdate}>
                <button 
                    type="submit"
                    className={style.update}
                >
                    Update
                </button>
            </div>
            </form>
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
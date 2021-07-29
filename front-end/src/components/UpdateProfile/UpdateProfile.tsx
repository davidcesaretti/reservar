import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase/index";
import { Link } from "react-router-dom";

import style from "./UpdateProfile.module.css";
import { UserEmailGlobal, updateUser, getUserInfo } from "../../actions/index";
import { useAuth } from "../../firebase/index";
import Swal from "sweetalert2";

const Perfil = () => {
  const auth = useAuth();

  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    name: "",
    recuperation_email: "",
    phone_number: undefined,
    identity_document_type: "",
    identity_document_number: undefined,
    nationality: "",
    date_birth: "",
    residence_address: "",
    city_and_country_of_residence: "",
    emergency_phone_number: undefined,
    emergency_contact: "",
    relationship: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    })
  }

  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const handleUpdate = (e) => {
    e.preventDefault();

    if (info.name === "") {
      alert("write your name");
      return;
    }
    if (!emailRegex.test(info.recuperation_email)) {
      alert(
        "write an alternative mail in case you need to recover your account"
      );
      return;
    }
    if (info.phone_number < 1000000) {
      alert("write your phone number");
      return;
    }
    if (info.identity_document_type === "Select") {
      alert("select your document type");
      return;
    }
    if (info.identity_document_number < 1000000) {
      alert("write your document number");
      return;
    }
    if (info.nationality === "") {
      alert("write your nationality");
      return;
    }
    if (info.date_birth === "") {
      alert("write your birth date");
      return;
    }
    if (info.residence_address === "") {
      alert("write your adress");
      return;
    }
    if (info.city_and_country_of_residence === "") {
      alert("write your residence");
      return;
    }
    if (info.emergency_phone_number < 1000000) {
      alert("write the phone of an emergency contact");
      return;
    }
    if (!emailRegex.test(info.emergency_contact)) {
      alert("write the email of the emergency contact");
      return;
    }
    if (info.relationship === "") {
      alert("write your relationship with the emergency contact");
      return;
    }

    let userEmail = auth.user.email;

    const dispatchuser = () => {
      dispatch(getUserInfo(userEmail));
    };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(updateUser(info, userEmail));
        Swal.fire("Saved!", "", "success");
        setTimeout(dispatchuser, 2000);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <div>
      <div className={style.navBar}>
        <div>
          <h2 className={style.header}>My Profile</h2>
          <form
            onSubmit={(e) => {
              handleUpdate(e);
            }}
          >
            <div className={style.ctn}>
              <div className={style.field}>
                <label className={style.nameField}>Complete name</label>
                <input
                  placeholder="Your name"
                  className={style.inputField}
                  name="name"
                  value={info.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Recuperation Email</label>
                <input
                  placeholder="henry@gmail.com"
                  className={style.inputField}
                  name="recuperation_email"
                  value={info.recuperation_email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Document type</label>

                <select
                  className={style.selectField}
                  name="identity_document_type"
                  onChange={(e) => {
                    handleSelect(e)
                  }}
                >
                  <option value="Select">Select</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Passport">Passport</option>
                  <option value="Social Security card">Social Security card</option>
                  <option value="Birth certificate">Birth certificate</option>
                </select>
                {/*  <input
                  placeholder="DNI"
                  
                  name="identity_document_type"
                  value={info.identity_document_type}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                /> */}
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Document number</label>
                <input
                  placeholder="37594328"
                  className={style.inputField}
                  name="identity_document_number"
                  value={info.identity_document_number}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Nationality</label>
                <input
                  placeholder="Argentina"
                  className={style.inputField}
                  name="nationality"
                  value={info.nationality}
                  onChange={(e) => {
                    handleChange(e);
                  }}
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
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Residence address</label>
                <input
                  placeholder="Italia 165"
                  className={style.inputField}
                  name="residence_address"
                  value={info.residence_address}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>
                  City and country of residence
                </label>
                <input
                  placeholder="General Lagos, Argentina"
                  className={style.inputField}
                  name="city_and_country_of_residence"
                  value={info.city_and_country_of_residence}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Emergency contact</label>
                <input
                  placeholder="+54341598621"
                  className={style.inputField}
                  name="emergency_phone_number"
                  value={info.emergency_phone_number}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>Contact email </label>
                <input
                  placeholder="plataforma5@gmail.com"
                  className={style.inputField}
                  name="emergency_contact"
                  value={info.emergency_contact}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className={style.field}>
                <label className={style.nameField}>
                  Relationship with contact
                </label>
                <input
                  placeholder="Friend"
                  className={style.inputField}
                  name="relationship"
                  value={info.relationship}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <div className={style.ctnUpdate}>
              <button type="submit" className={style.update}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

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
};
export default Perfil;

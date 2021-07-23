import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import style from "./User.module.css";
import Profile from "../Profile/Profile";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import Bookings from "../Bookings/Bookings";
import Favorites from "../Favorites/Favorites";
import Spinner from "../Spinner/Spinner";
import HistoryTravels from "../HistoryTravels/HistoryTravels";
import CreatePublications from '../CreatePublications/CreatePublications'
import MyProperties from '../MyProperties/MyProperties'
import Balance from '../Balance/Balance'
import Chat from '../Chat/Chat'
import { getUserInfo } from "../../actions/index";
import Swal from "sweetalert2";

const User = () => {
  const auth = useAuth();

  const dispatch = useDispatch();
  const history = useHistory();
  let userInfo = useSelector((state: any) => state.user);

  const [section, setSection] = useState("");
  const [userType, setUserType] = useState('Traveller')
  const [sectionHost, setSectionHost] = useState('Profile')

  let email = auth.user.email;
  console.log("useSelector ", userInfo);

  useEffect(() => {
    dispatch(getUserInfo(email));
  }, [email]);

  useEffect(() => {
    if (userInfo.nationality !== undefined) {
      setSection("Profile");
    } else {
      setSection("Update");
    }
  }, [userInfo]);

  if (!userInfo) {
    Swal.fire({
      title: "Please, complete your information",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  }

  const clickProfile = () => {
    /* if (userInfo.nationality !== undefined) { */
      setSection("Profile");
    /* } else {
      Swal.fire({
        title: "Please, complete your information",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setSection("Update");
    } */
  };

  const clickUpdate = () => {
    setSection("Update");
  };

  const clickBookings = () => {
    setSection("Bookings");
  };

  const clickFavourites = () => {
    setSection("Favorites");
  };

  const clickHistoryTravels = () => {
    setSection("History");
  };

  const clickCreate = () => {
    setSectionHost("CreatePublications");
  };

  const clickProperties = () => {
    setSectionHost("MyProperties")
  }

  const clickBalance = () => {
    setSectionHost("Balance")
  }

  const clickChat = () => {
    setSectionHost("Chat")
  }


  const logOut = () => {
    auth.signout()
    history.push('/')
  }

  return (
    userType === 'Traveller' ?
    <div>
      <div className={style.navBar}>
        <div>
          {auth.user.photoURL ? (
            <img
              className={style.picture}
              src={auth.user.photoURL}
              alt="profile"
            />
          ) : (
            <img
              className={style.picture}
              src="https://w7.pngwing.com/pngs/154/803/png-transparent-computer-icons-user-profile-avatar-blue-heroes-window.png"
              alt="profile"
            />
          )}
        </div>
        <div className={style.menu}>
          <div className={style.title}>
            {userInfo?.name ? (
              <h4 className={style.bienvenida}>Bienvenido {userInfo.name}</h4>
            ) : (
              <h4 className={style.bienvenida}>
                Bienvenido {auth.user.displayName}
              </h4>
            )}
            <div className={style.buttonsNavBar}>
              <Link to="/" className={style.navButton1}>
                Home
              </Link>
              <div className={style.line}></div>
              <Link to="/categories" className={style.navButton}>
                Categories
              </Link>
            </div>
          </div>
          <div className={style.separator}></div>
          <nav className={style.options}>
            <button
              className={style.buttonOption}
              onClick={(e) => {
                clickProfile();
              }}
            >
              Profile
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={(e) => {
                clickUpdate();
              }}
            >
              Edit profile
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => {
                clickBookings();
              }}
            >
              My bookings
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => {
                clickFavourites();
              }}
            >
              Favourites
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => {
                clickHistoryTravels();
              }}
            >
              History of travels
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => logOut()}
            >
              Signout
            </button>
          </nav>
        </div>
      </div>
      {section === "Profile" ? (
        <Profile
          name={userInfo?.name}
          alternative_email={userInfo?.alternative_email}
          phone_number={userInfo?.phone_number}
          identity_document_type={userInfo?.identity_document_type}
          identity_document_number={userInfo?.identity_document_number}
          nationality={userInfo?.nationality}
          date_birth={userInfo?.date_birth}
          residence_address={userInfo?.residence_address}
          city_and_country_of_residence={
            userInfo?.city_and_country_of_residence
          }
          emergency_phone_number={userInfo?.emergency_phone_number}
          emergency_contact={userInfo?.emergency_contact}
          relationship={userInfo?.relationship}
          userType={userType}
          setUserType={setUserType}
        />
      ) : section === "Update" ? (
        <UpdateProfile />
      ) : section === "Bookings" ? (
        <Bookings />
      ) : section === "Favorites" ? (
        <Favorites />
      ) : section === "History" ? (
        <HistoryTravels />
      ) : (
        <Spinner />
      )}
      <div className={style.footer}>
        <p className={style.infoFooter}>COPYRIGHT 2021</p>
      </div>
    </div>
    :
    <div>
      <div className={style.navBarHost}>
        <div>
          {auth.user.photoURL ? (
            <img
              className={style.picture}
              src={auth.user.photoURL}
              alt="profile"
            />
          ) : (
            <img
              className={style.picture}
              src="https://w7.pngwing.com/pngs/154/803/png-transparent-computer-icons-user-profile-avatar-blue-heroes-window.png"
              alt="profile"
            />
          )}
        </div>
        <div className={style.menu}>
          <div className={style.title}>
            {userInfo?.name ? (
              <h4 className={style.bienvenida}>Bienvenido {userInfo.name}</h4>
            ) : (
              <h4 className={style.bienvenida}>
                Bienvenido {auth.user.displayName}
              </h4>
            )}
            <div className={style.buttonsNavBar}>
              <Link to="/" className={style.navButton1}>
                Home
              </Link>
              <div className={style.line}></div>
              <Link to="/categories" className={style.navButton}>
                Categories
              </Link>
            </div>
          </div>
          <div className={style.separator}></div>
          <nav className={style.options}>
            <button
              className={style.buttonOption}
              onClick={(e) => {
                clickProfile();
              }}
            >
              Profile
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={(e) => {
                clickCreate();
              }}
            >
              Create Publications
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => {
                clickProperties();
              }}
            >
              My Properties
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => {
                clickBalance();
              }}
            >
              Balance
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => {
                clickChat();
              }}
            >
              Chat
            </button>
            <div className={style.line}></div>
            <button
              className={style.buttonOption}
              onClick={() => logOut()}
            >
              Signout
            </button>
          </nav>
        </div>
      </div>

      {sectionHost === "Profile" ? (
        <Profile
          name={userInfo?.name}
          alternative_email={userInfo?.alternative_email}
          phone_number={userInfo?.phone_number}
          identity_document_type={userInfo?.identity_document_type}
          identity_document_number={userInfo?.identity_document_number}
          nationality={userInfo?.nationality}
          date_birth={userInfo?.date_birth}
          residence_address={userInfo?.residence_address}
          city_and_country_of_residence={
            userInfo?.city_and_country_of_residence
          }
          emergency_phone_number={userInfo?.emergency_phone_number}
          emergency_contact={userInfo?.emergency_contact}
          relationship={userInfo?.relationship}
          userType={userType}
          setUserType={setUserType}
        />
      ) : sectionHost === "CreatePublications" ? (
        <CreatePublications />
      ) : sectionHost === "MyProperties" ? (
        <MyProperties />
      ) : sectionHost === "Balance" ? (
        <Balance />
      ) : sectionHost === "Chat" ? (
        <Chat />
      ) : (
        <Spinner />
      )}


      <div className={style.footerHost}>
        <p className={style.infoFooter}>COPYRIGHT 2021</p>
      </div>
    </div>
  )

};

export default User;

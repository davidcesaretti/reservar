import { Link } from '@material-ui/icons';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import style from './Footer.module.css';


const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.acerca}>
                <h4 style={{marginLeft: "38px"}}>ACERCA DE</h4>
                <ul>
                    <li><a href="">¿CÓMO FUNCIONA?</a></li>
                    <li><a href="">TÉRMINOS Y CONDICIONES</a></li>
                    <li><a href="">MAPA DEL SITIO</a></li>
                    <li><a href="">PREGUNTAS FRECUENTES</a></li>
                    <li><a href="">POLÍTICA DE PRIVACIDAD</a></li>
                </ul>
            </div>
            <div className={style.ops}>
                <h4 style={{marginLeft: "38px"}}>OPCIONES DE ALOJAMIENTO</h4>
                <ul>
                    <li><a href="">HOSTALES/BED & BREAKFAST</a></li>
                    <li><a href="">CASAS & DEPARTAMENTOS</a></li>
                    <li><a href="">FUERA DE LO COMUN</a></li>
                    <li><a href="">QUIERO SER HOST</a></li>
                </ul>
            </div>
            <div className={style.iconos}>
                <h4 style={{marginLeft: "38px"}}>SÍGUENOS</h4>
                <li>
                    <TwitterIcon/>
                    <InstagramIcon/>
                </li>
            </div>
        </div>
    )
}

export default Footer;

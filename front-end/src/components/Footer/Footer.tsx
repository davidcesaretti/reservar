import { Link } from '@material-ui/icons';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const Footer = () => {
    return (
        <div>
            <div>
                <h4>ACERCA DE</h4>
                <ul>
                    <ul><a href="">¿CÓMO FUNCIONA?</a></ul>
                    <ul><a href="">TÉRMINOS Y CONDICIONES</a></ul>
                    <ul><a href="">MAPA DEL SITIO</a></ul>
                    <ul><a href="">PREGUNTAS FRECUENTES</a></ul>
                    <ul><a href="">POLÍTICA DE PRIVACIDAD</a></ul>
                </ul>
            </div>
            <div>
                <h4>OPCIONES DE ALOJAMIENTO</h4>
                <ul>
                    <ul><a href="">HOSTALES/BED & BREAKFAST</a></ul>
                    <ul><a href="">CASAS & DEPARTAMENTOS</a></ul>
                    <ul><a href="">FUERA DE LO COMUN</a></ul>
                    <ul><a href="">QUIERO SER HOST</a></ul>
                </ul>
            </div>
            <div>
                <h4>SÍGUENOS</h4>
                <ul>
                    <TwitterIcon/>
                    <InstagramIcon/>
                </ul>
            </div>
        </div>
    )
}

export default Footer;

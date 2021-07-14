import { Link } from '@material-ui/icons';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { createTheme, makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
    footer:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        textDecoration: 'none',
    },
    acercaa:{
        textDecoration: 'none',
    },
    acercali:{
        listStyle: 'none',
        marginTop: '10px',
    },
    opsa:{
        textDecoration: 'none',
    },
    opsli:{
        listStyle: 'none',
        marginTop: '10px',
    },
    iconosli:{
        listStyle: 'none',
    },
    titulo:{
        marginLeft: '38px',
    }
}))

 const Footer = () => {

//     const classes = styles();

//     return (
//         <div className={classes.footer}>
//             <div>
//                 <h4 className={classes.titulo}>ACERCA DE</h4>
//                 <ul>
//                     <li className={classes.acercali}><a className={classes.acercaa} href="">¿CÓMO FUNCIONA?</a></li>
//                     <li className={classes.acercali}><a className={classes.acercaa} href="">TÉRMINOS Y CONDICIONES</a></li>
//                     <li className={classes.acercali}><a className={classes.acercaa} href="">MAPA DEL SITIO</a></li>
//                     <li className={classes.acercali}><a className={classes.acercaa} href="">PREGUNTAS FRECUENTES</a></li>
//                     <li className={classes.acercali}><a className={classes.acercaa} href="">POLÍTICA DE PRIVACIDAD</a></li>
//                 </ul>
//             </div>
//             <div >
//                 <h4 className={classes.titulo}>OPCIONES DE ALOJAMIENTO</h4>
//                 <ul>
//                     <li className={classes.opsli}><a className={classes.opsa} href="">HOSTALES/BED & BREAKFAST</a></li>
//                     <li className={classes.opsli}><a className={classes.opsa} href="">CASAS & DEPARTAMENTOS</a></li>
//                     <li className={classes.opsli}><a className={classes.opsa} href="">FUERA DE LO COMUN</a></li>
//                     <li className={classes.opsli}><a className={classes.opsa} href="">QUIERO SER HOST</a></li>
//                 </ul>
//             </div>
//             <div >
//                 <h4 className={classes.titulo}>SÍGUENOS</h4>
//                 <li className={classes.iconosli}>
//                     <TwitterIcon/>
//                     <InstagramIcon/>
//                 </li>
//             </div>
//         </div>
//     )
}

export default Footer;

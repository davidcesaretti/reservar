import React from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Image1 from '../../Image/pexels-pixabay-210017.jpeg'
import Recom1 from '../../Image/recom1.jpeg'
import Recom2 from '../../Image/recom2.jpeg'
import Recom3 from '../../Image/recom3.jpeg'
import Recom4 from '../../Image/recom4.jpeg'
import Tipos1 from '../../Image/tipos1.jpeg'
import Tipos2 from '../../Image/tipos2.jpeg'
import Tipos3 from '../../Image/tipos3.jpeg'
import Chica from '../../Image/chica.jpeg'
import Footer from '../Footer/Footer';



const useStyle = makeStyles({
    containerFilters: {
        backgroundSize: 'cover',
        backgroundImage: `url(${Image1})`,
        display: 'grid',
        justifyContent: 'center',
        backgroundPosition: 'center'
    },
    containerRecomendados: {
        padding:'0.5rem 3rem',
    },
    containerTipos: {
        padding:'0.5rem 3rem'
    },
    imgRecomendadas: {
        borderRadius: '1em',
        width: '100%',
        height: '100%',
        maxHeight: '8rem',
        maxWidth: '14rem',
        backgroundPosition: 'center'
    },
    imgTiposAlojamiento: {

    }

});


const Home = () => {

    const classes = useStyle();

    return (
        <div >
            <Grid container justifyContent='center' spacing={5}>
                <Grid container item xs={12} className={classes.containerFilters} justifyContent='center' >
                    <Grid item xs={12} >
                        <Typography variant='h5'>
                            EXPLORA LOS ANDES !!!
                        </Typography>
                    </Grid>
                    <Grid container style={{display: 'flex', border: 'solid', backgroundColor: 'white', width: '80%'}} >
                        <Grid item xs={2} container style={{display: 'flex', width: '25%'}}>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2'>
                                    ¿A donde quieres ir?
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input placeholder='Escoge el destino'></input>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} container style={{display: 'flex', width: '25%'}}>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2'>
                                    Fecha de llegada
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input placeholder='Elige la fecha'></input>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} container style={{display: 'flex', width: '25%'}}>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2'>
                                    Fecha de salida
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input placeholder='Elige la fecha'></input>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} container style={{display: 'flex', width: '25%'}}>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2'>
                                    ¿Cuántos viajan?
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input placeholder='2 adultos, 0 niños'></input>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} style={{display: 'flex', width: '25%'}}>
                            <SearchIcon/>
                        </Grid>
                    </Grid>
                    <br/>
                </Grid>
                <Grid xs={12} alignItems='center' justifyContent='space-between' direction='row' container className={classes.containerRecomendados}  >
                        <Grid item xs={2} style={{textAlign: 'center'}}>
                            <Typography variant='h6'>Recomendados</Typography>
                        </Grid>
                        <Grid item xs={2}> 
                            <img src={`${Recom1}`} alt='' className={classes.imgRecomendadas} />
                        </Grid>
                        <Grid item xs={2}>
                            <img src={`${Recom2}`} alt='' className={classes.imgRecomendadas} />
                        </Grid>
                        <Grid item xs={2}>
                            <img src={`${Recom3}`} alt='' className={classes.imgRecomendadas} />
                        </Grid>
                        <Grid item xs={2}>
                            <img src={`${Recom4}`} alt='' className={classes.imgRecomendadas} />
                        </Grid>
                </Grid>
                <Grid container item xs={12} justifyContent='center' className={classes.containerTipos} >
                    <Grid item xs={12}>
                        <Typography variant='h6'>EXPLORA SEGUN EL TIPO DE ALOJAMIENTO QUE QUIERES DISFRUTAR</Typography>
                    </Grid>
                    <Grid item xs={12} justifyContent='space-evenly' container>
                            <Grid item xs={3}  style={{padding:'3rem', backgroundImage: `url(${Tipos1})` , backgroundSize: 'cover', height: '100%', backgroundPosition: 'center', borderRadius:'1em'}}>
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>Hostales & Bed & Breakfast</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>Explorar</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}  style={{padding:'3rem', backgroundImage: `url(${Tipos2})` , backgroundSize: 'cover', height: 'auto', backgroundPosition: 'center', borderRadius:'1em'}}>
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>Casas y Apartamentos</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>Explorar</Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={3} style={{padding:'3rem', backgroundImage: `url(${Tipos3})` , backgroundSize: 'cover', height: 'auto', backgroundPosition: 'center', borderRadius:'1em'}}>
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>Fuera de lo comun</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button>Explorar</Button>
                                </Grid>
                            </Grid>
                    </Grid>
                </Grid>
                <Divider/>
    
                    <Grid item xs={10} direction='column' container style={{backgroundImage: `url(${Chica})` , backgroundSize: 'cover', height:'20rem ', backgroundPosition: 'center', borderRadius:'1em'}}>
                        <Grid item xs={6}>
                            <Typography variant='subtitle1'>
                                Tienes un inmueble para alquilar? Regístrate como Host y empieza a recibir huéspedes
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button >Quiero set Host !</Button>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent='space-between'>
                        <Footer/>
                    </Grid>
            </Grid>
        </div>
    )
}

export default Home

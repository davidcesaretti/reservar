import React from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Image1 from '../../Image/pexels-pixabay-210017.jpeg'


const useStyle = makeStyles({
    boxFilters: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,

    },
    containerFilters: {
        backgroundSize: 'cover',
        backgroundImage: `url(${Image1})`,
        display: 'grid',
        justifyContent: 'center'
        
    },
    containerRecomendados: {
        display: 'grid',
        gridTemplateColumns: '5fr'
    }
});


const Home = () => {

    const classes = useStyle();

    return (
        <div >
            <Grid container justifyContent='center' >
                <Grid item xs={12} className={classes.containerFilters} >
                    <Typography variant='h5'>
                        EXPLORA LOS ANDES !!!
                    </Typography>
                    <Grid>
                        <Box  border={2} className={classes.boxFilters}>
                            <Grid>
                                <Typography variant='subtitle2'>
                                    ¿A donde quieres ir?
                                </Typography>
                                <input placeholder='Escoge el destino'></input>
                            </Grid>
                            <Grid>
                                <Typography variant='subtitle2'>
                                    Fecha de llegada
                                </Typography>
                                <input placeholder='Elige la fecha'></input>
                            </Grid>
                            <Grid>
                                <Typography variant='subtitle2'>
                                    Fecha de salida
                                </Typography>
                                <input placeholder='Elige la fecha'></input>
                            </Grid>
                            <Grid>
                                <Typography variant='subtitle2'>
                                    ¿Cuántos viajan?
                                </Typography>
                                <input placeholder='2 adultos, 0 niños'></input>
                            </Grid>
                            <Grid>
                                <SearchIcon/>
                            </Grid>
                        </Box>
                    </Grid>
                    <br/>
                </Grid>
                <Grid item xs={8} justifyContent='center' direction='row' >
                    <Box >
                        <Typography variant='h6'>Recomendados</Typography>
                        <Grid>Imagen 1</Grid>
                        <Grid>Imagen 2</Grid>
                        <Grid>Imagen 3</Grid>
                        <Grid>Imagen 4</Grid>
                    <br/>
                    <br/>
                    </Box>
                </Grid>
                <Grid container item xs={8} justifyContent='center'>
                    <Typography variant='h6'>EXPLORA SEGUN EL TIPO DE ALOJAMIENTO QUE QUIERES DISFRUTAR</Typography>
                    <Grid item xs={8} justifyContent='center'>
                        <Box display='flex'  justifyContent='center'>
                            <Box border={2}>
                                <Typography variant='subtitle1'>Hostales & Bed & Breakfast</Typography>
                                <Button>Explorar</Button>
                            </Box>
                            <Box border={2}>
                                <Typography variant='subtitle1'>Casas y Apartamentos</Typography>
                                <Button>Explorar</Button>
                            </Box>
                            <Box border={2}>
                                <Typography variant='subtitle1'>Fuera de lo comun</Typography>
                                <Button>Explorar</Button>
                            </Box>
                        </Box>
                        <br/>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <Box border={2}>
                        <Box>
                            <Typography variant='subtitle1'>
                                Tienes un inmueble para alquilar? Regístrate como Host y empieza a recibir huéspedes
                            </Typography>
                        </Box>
                        <Button>Quiero set Host !</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home

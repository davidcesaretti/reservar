import React from 'react'
import { Box, Button, Grid } from '@material-ui/core'


const Home = () => {
    return (
        <div>
            <Grid container >
                <Grid item xs={8} >
                    <h2 >EXPLORA LOS ANDES !!!</h2>
                    <Box border={2}>SearchBar</Box>
                </Grid>
                <Grid item xs={8}>
                    <Box border={2}>Recomendados</Box>
                    <img/>
                    <img/>
                    <img/>
                    <img/>
                </Grid>
                <Grid item xs={8} direction='column' alignContent='center'>
                    <Box display='flex'>EXPLORA SEGUN EL TIPO DE ALOJAMIOENTO QUE QUIERES DISFRUTAR</Box>
                    <Box display='flex'>
                        <Box border={2}>
                            <h3>Hostales & Bed & Breakfast</h3>
                            <Button>Explorar</Button>
                        </Box>
                        <Box border={2}>
                        <h3>Casas y Apartamentos</h3>
                            <Button>Explorar</Button>
                        </Box>
                        <Box border={2}>
                        <h3>Fuera de lo comun</h3>
                            <Button>Explorar</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box border={2}>
                        <Box>
                            <p>
                                Tienes un inmueble para alquilar? Regístrate como Host y empieza a recibir huéspedes
                            </p>
                        </Box>
                        <Button>Quiero set Host !</Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home

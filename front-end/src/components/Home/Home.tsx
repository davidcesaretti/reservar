import React from 'react'
import { Box, Grid } from '@material-ui/core'


const Home = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={8}>
                    <Box border={2}>SearchBar</Box>
                </Grid>
                <Grid item xs={8}>
                    <Box border={2}>Categorias</Box>
                </Grid>
                <Grid item xs={8}>
                    <Box border={2}>Registro</Box>
                </Grid>
                <Grid item xs={12}>
                    <Box>  </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home

import React from "react";

import Filter from "./filter";
import Display from "./display";

import Grid from '@mui/material/Grid';

const Censor = () => {

    return (
        <Grid container >
            <Grid item xs={2}>
                <Filter />
            </Grid>

            <Grid item xs={10}>
                <Display />
            </Grid>

        </Grid>

    )
}

export default Censor
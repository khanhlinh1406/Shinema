import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';


import Stack from '@mui/material/Stack';
import { Typography, Button } from "@mui/material";

import { Helmet } from 'react-helmet-async';

import NewReviewForm from './newReviewForm'
import UserHeader from "./userHeader";

const NewReview = () => {

    const user = useSelector(state => state.users.instance)

    return (
        <Stack >
            <Helmet>
                <title>Review</title>
            </Helmet>

            <Typography variant="h5" sx={{ marginTop: 5, marginLeft: 2 }}>REVIEWS FILM</Typography>

            <Stack sx={{ backgroundColor: 'rgb(9, 24, 48)', marginX: 9, marginY: 5, padding: 3, borderRadius: 3 }}>
                <UserHeader />
                <NewReviewForm />
            </Stack>

        </Stack>
    )
}


export default NewReview
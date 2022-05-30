import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { reviewSlice } from '../../../redux/slices/reviewSlice';
import { reviewListByStatusSelector } from '../../../redux/selector'

import ReviewItem from './item';

import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import ReviewApi from './../../../api/reviewApi';

const Display = () => {
    let dispatch = useDispatch()
    let data = useSelector(reviewListByStatusSelector)

    useEffect(() => {
        ReviewApi.getAll().then(res => {
            if (res.status == 200) {
                dispatch(reviewSlice.actions.updateData(res.data))
                dispatch(reviewSlice.actions.updateStatusSearch('All'))
            }
            else {
                console.log(res)
            }
        }).catch(err => console.log(err))

    }, [])
    return (
        <Grid container spacing={2} >
            {
                !data ? <LoadingBlog /> :
                    data.map((item, index) => (
                        <Grid item key={index} >
                            <ReviewItem item={item} />
                        </Grid>
                    ))
            }
        </Grid>
    )
}

const LoadingBlog = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
    )
}

export default Display
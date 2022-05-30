import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { movieSlice } from "../../../redux/slices/movieSlice";

import ReviewApi from '../../../api/reviewApi';
import ReviewItem from "../reviewItem";

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

const Review = () => {
    // const [imgs, setImgs] = useState([])
    // const newImageHandle = (e) => {
    //     if (e.target.files) {
    //         const listFile = []
    //         for (let i = 0; i < e.target.files.length; i++) {
    //             let reader = new FileReader();
    //             reader.readAsDataURL(e.target.files[i])
    //             reader.onloadend = () => {
    //                 listFile.push(reader.result);
    //                 if (i == e.target.files.length - 1) {
    //                     let temp = imgs.concat(listFile)
    //                     setImgs(temp)
    //                     cloudinaryApi.upload(temp).then(res => {
    //                         console.log(res)
    //                     }).catch(err => console.log(err))
    //                 }
    //             }
    //         }
    //     }

    //   }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([])

    useEffect(() => {
        ReviewApi.getAll().then(res => {
            if (res.status == 200) {
                setData(res.data)
            }
        }).catch(err => console.log(err))
    }, [])

    const newPostHandle = () => {
        dispatch(movieSlice.actions.updateSelectForReview({}))

        navigate('/reviews/new-post')
    }

    return (
        <Stack >
            <Helmet>
                <title>Review</title>
            </Helmet>

            <div style={{ display: 'flex', marginTop: 120, justifyContent: 'space-between', paddingLeft: 50, paddingRight: 55, boxSizing: 'border-box' }}>
                <Typography variant="h5" >REVIEWS FILM</Typography>
                <CustomFillButton onClick={() => newPostHandle()}>New post</CustomFillButton>
            </div>

            <Grid container spacing={2} sx={{ padding: 4, }}>
                {
                    !data ? <LoadingBlog /> :
                        data.map((item, index) => (
                            <Grid item key={index} >
                                {item.status == 'Inspected' && item._censorId != null && item._censorId != '' && <ReviewItem item={item} />}
                            </Grid>
                        ))
                }
            </Grid>

        </Stack >
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

const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[900]),
    backgroundColor: red[800],
    '&:hover': {
        backgroundColor: red[500],
    },
    padding: '6px 35px',
    //borderRadius: '10px'

}));

export default Review
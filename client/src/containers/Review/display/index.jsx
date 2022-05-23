import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from 'react-router-dom';

import ReviewApi from '../../../api/reviewApi';
import ReviewItem from "../reviewItem";

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";

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

    const [data, setData] = useState([])

    useEffect(() => {
        ReviewApi.getAll().then(res => {
            if (res.status == 200) {
                setData(res.data)
            }
        }).catch(err => console.log(err))
    }, [])

    return (
        <div >
            <Helmet>
                <title>Review</title>
            </Helmet>
            <Typography variant="h5" sx={{ marginTop: 5, marginLeft: 5 }}>REVIEWS FILM</Typography>


            <Grid container spacing={2} sx={{ margin: 4 }}>
                {
                    !data ? <LoadingBlog /> :
                        data.map((item, index) => (
                            <Grid item key={index} >
                                <ReviewItem item={item} />
                            </Grid>
                        ))
                }
            </Grid>

        </div>
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

export default Review
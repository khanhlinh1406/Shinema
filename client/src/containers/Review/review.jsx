import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import './review.css'

import Button from '@mui/material/Button';
import cloudinaryApi from './../../api/cloudinaryAPI';

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

    return (
        <div className="review-container">
            <Helmet>
                <title>Review</title>
            </Helmet>


        </div>
    )
}

export default Review
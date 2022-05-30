import React from "react";
import { Routes, Route } from 'react-router-dom';

import DisplayReview from "./display";
import EditReview from "./editReview";
import NewReview from "./newReview";
import ReviewDetail from "./reviewDetail";

const Review = () => {
    return (
        <div >

            <Routes>
                <Route path="/" element={<DisplayReview />}></Route>
                <Route path="/new-post" element={<NewReview />}></Route>
                <Route path="/detail/:reviewId" element={<ReviewDetail />}></Route>
                <Route path="/edit/:reviewId" element={<EditReview />}></Route>
            </Routes>

        </div>
    )
}

export default Review
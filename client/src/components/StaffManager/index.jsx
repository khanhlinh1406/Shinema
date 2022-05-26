import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DisplayStaff from './displayStaff/displayStaff';
import NewStaff from './newStaff/newStaff'
import EditStaff from './editStaff/editStaff'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const StaffManager = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Routes>
                <Route path="staff/" element={<DisplayStaff />}></Route>
                <Route path="staff/add" element={<NewStaff />}></Route>
                <Route path="staff/edit/:id" element={<EditStaff />}></Route>
            </Routes>
        </div>
    )
}

export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));

export const CustomOutlineButton = styled(Button)(({ theme }) => ({
    color: grey[900],
    borderColor: grey[900],
    borderWidth: 1,
    borderStyle: 'solid',
    '&:hover': {
        backgroundColor: grey[900],
        color: theme.palette.getContrastText(grey[900]),
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));
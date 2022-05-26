import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DisplayStaff from './displayStaff/displayStaff';
import NewStaff from './newStaff/newStaff'
import EditStaff from './editStaff/editStaff'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import { grey, red, white } from '@mui/material/colors';

export const StaffManager = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Routes>
                <Route path="manager/staff/" element={<DisplayStaff />}></Route>
                <Route path="manager/staff/add" element={<NewStaff />}></Route>
                <Route path="manager/staff/edit/:id" element={<EditStaff />}></Route>
            </Routes>
        </div>
    )
}

export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#fff'),
    backgroundColor: red[600],
    '&:hover': {
        backgroundColor: red[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '20px'
}));

export const CustomOutlineButton = styled(Button)(({ theme }) => ({
    color: red[700],
    borderColor: red[700],
    borderWidth: 1,
    borderStyle: 'solid',
    '&:hover': {
        backgroundColor: red[900],
        color: theme.palette.getContrastText(red[900]),
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '20px'

}));
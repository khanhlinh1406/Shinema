import React from "react";
import './navBar.css'
import { useState, useEffect } from 'react'
import AccountApi from '../../api/accountApi'

const Navbar = () => {
    useEffect(() => {
        AccountApi.getAll().then(
            res => {
                console.log(res)
            }
        )
    }
        , [])

    return (
        <div>
            <p>Nav bar nè</p>
        </div>
    )
}

export default Navbar;
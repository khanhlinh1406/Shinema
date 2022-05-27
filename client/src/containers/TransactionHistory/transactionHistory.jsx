import { Stack } from '@mui/material'
import React from 'react'
import DisplayHistory from './../../components/TransactionHistory/displayHistory/displayHistory';

const TransactionHistory = () => {
  return (
    <div style={{marginTop: '100px'}}>
        <DisplayHistory/>
    </div>
  )
}

export default TransactionHistory
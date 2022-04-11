import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { theaterSlice } from './../../redux/slices/theaterSlice';
import { theaterRemainingSelector, theaterSelectSelector } from '../../redux/selector'

import TheaterApi from '../../api/theaterApi'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const color = "white";
const CustomizedSelect = styled(Select)`
    color: #fff;   
  `;
const CustomizedInputLabel = styled(InputLabel)`
    color: #fff;   
  `;

const TheaterManager = () => {
    const data = useSelector(theaterRemainingSelector)
    const dataSelect = useSelector(theaterSelectSelector)

    const dispatch = useDispatch()
    const getTheaters = () => {
        TheaterApi.getAll().then(res => {
            dispatch(theaterSlice.actions.updateAll(res))
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTheaters()
    }, [])

    const [theaterSelect, setTheaterSelect] = useState('');
    const handleChange = (event) => {
        setTheaterSelect(event.target.value);
        dispatch(theaterSlice.actions.setFilter(event.target.value))
    };

    return (
        <Box sx={{ width: '100%' }}>
            {data &&
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <CustomizedInputLabel id="demo-simple-select-autowidth-label">Rạp</CustomizedInputLabel>
                    <CustomizedSelect
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={theaterSelect}
                        onChange={handleChange}
                        autoWidth
                        label="Rạp"
                        sx={{
                            svg: { color: '#fff' },
                            input: { color: '#fff' },
                            label: { color: '#fff' },
                        }}
                    >
                        <MenuItem value="all" >
                            <em>Tất cả</em>
                        </MenuItem>

                        {dataSelect.map((item, index) => (
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                        ))}

                    </CustomizedSelect>
                </FormControl>
            }
        </Box>
    )
}
export default TheaterManager
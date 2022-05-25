import { createSlice } from "@reduxjs/toolkit";
import { movieType } from '../../api/tmdbApi'
import TheaterApi from "../../api/theaterApi";
import { StaticDateTimePicker } from "@mui/lab";

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        selectedFilm: '',
        selectedDate: '',
        selectedTime: '',
        selectedTheater: '',
        selectedRoom: '',
        selectedShowTimeId: '',
        showTimeList: [],
        currentTimeArray: [],
        currentTheaterIdArray: [],
        currentTheaterArray: [],
        currentRoomIdArray: [],
        check: false,
        selectedSeats: []
    },
    reducers: {
        setSelectedFilm: (state, action) => {
            state.selectedFilm = action.payload
        },

        setDate: (state, action) => {
            state.selectedDate = action.payload

            //set Time Array
            const tmp = state.showTimeList
            let timeTmp = []
            tmp.forEach((showTime) => {
                showTime.listDateTime.forEach((object) => {
                    if (object.date == state.selectedDate) {
                        object.times.forEach((time) => {
                            timeTmp.push(time)
                        })
                    }
                })
            })

            state.currentTimeArray = timeTmp
        },

        setTime: (state, action) => {
            state.selectedTime = action.payload

            const tmp = state.showTimeList
            let theaterIdArray = []
            tmp.forEach((showTime) => {
                showTime.listDateTime.forEach((object) => {
                    if (object.date == state.selectedDate) {
                        object.times.forEach((time) => {
                            if (time == state.selectedTime) {
                                theaterIdArray.push(showTime.theaterId)
                            }
                        })
                    }
                })
            })
            state.currentTheaterIdArray = theaterIdArray
        },

        setShowTimeList: (state, action) => {
            state.showTimeList = action.payload
        },

        setCurrentTimeArray: (state, action) => {
            state.currentTimeArray = action.payload
        },

        setSelectedTheater: (state, action) => {
            state.selectedTheater = action.payload

            state.showTimeList.forEach((showTime) => {
                if (showTime.theaterId == state.selectedTheater._id) {
                    showTime.listDateTime.forEach((dateTime) => {
                        if (dateTime.date == state.selectedDate) {
                            dateTime.times.forEach((time) => {
                                if (time == state.selectedTime) {
                                    state.selectedShowTimeId = showTime._id
                                }
                            })
                        }
                    })
                }
            })
        },

        setCurrentTheaterIdArray: (state, action) => {
            state.currentTheaterIdArray = action.payload
        },

        setCurrentTheaterArray: (state, action) => {
            state.currentTheaterArray = action.payload
        },

        setSelectedShowTimeId: (state, action) => {
            state.selectedShowTimeId = action.payload
        },

        setCheck: (state, action) => {
            state.check = action.payload

            let arr = []

            state.showTimeList.forEach(showTime => {
                if (showTime.theaterId === state.selectedTheater._id) {
                    arr.push(showTime.roomId)
                }
            })

            state.currentRoomIdArray = arr
                //console.log(arr)
        },

        setCurrentRoomIdArray: (state, action) => {
            state.currentRoomIdArray = action.payload
        },

        setSelectedSeats: (state, action) => {
            state.selectedSeats = action.payload
        },

        pushSelectedSeats: (state, action) => {
            state.selectedSeats.push(action.payload)
        },

        setSelectedRoom: (state, action) => {
            state.selectedRoom = action.payload
        }

    }
})
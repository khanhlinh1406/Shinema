import { createSelector } from '@reduxjs/toolkit'

export const movieSelector = (state) => state.movie
export const userSelector = (state) => state.users.instance

export const showTimeSelector = (state) => state.showTimes.data
export const showTimeDateFilterSelector = (state) => state.showTimes.filter.date

export const showTimeRemainingSelector = createSelector(
    showTimeSelector,
    showTimeDateFilterSelector,
    (showTimeList, date) => {
        let result = []
        showTimeList.forEach(showTime => {
            let tempListDateTime = showTime.listDateTime.filter(dateTime => {
                return dateTime.date == date
            })
            if (tempListDateTime.length != 0) {
                let tempShowTime = {...showTime, listDateTime: tempListDateTime }
                result = [...result, tempShowTime]
            }
        });
        return result
    })




export const theaterSelector = (state) => state.theaters.data
export const theaterFilterSelector = (state) => state.theaters.filter.id

export const theaterSelectSelector = createSelector(
    theaterSelector,
    (theaterList) => {
        let result = []
        theaterList.forEach(theater => {
            result = [...result, { _id: theater._id, name: theater.name }]
        })
        return result
    })

export const theaterRemainingSelector = createSelector(
    theaterSelector,
    theaterFilterSelector,
    (theaterList, theaterId) => {
        return theaterList.filter(theater => {
            return theater._id == theaterId
        })
    })

export const bookingSelector = (state) => state.booking
export const movieCornerSelector = (state) => state.corner__movie

export const currentStaffList = (state) => state.staff.staffList

export const currentTicketList = (state) => state.ticket.ticketList
export const currentCancelTicket = (state) => state.ticket.cancelTicket
export const reviewSelector = (state) => state.review.data
export const reviewStatusSearchSelector = (state) => state.review.statusSearch
export const reviewListByStatusSelector = createSelector(
    reviewSelector,
    reviewStatusSearchSelector,
    (listReviews, status) => {
        if (status == 'All') return listReviews
        else
            return listReviews.filter(review => {
                return review.status == status
            })
    })
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user', 
    initialState: {
        data: [],
        user: {}
    }, 
    reducers: {
        addUser: (state, action)=>{
            state.data.push(action.payload)
        },/// type: user/addUser

        updateUser: (state, action)=>{
            let updateData = state.data;
                updateData = updateData.map(user => {
                    if (user.id == action.payload.id)
                        return action.payload
                    else return user
                })
            
            state.data = updateData
        },/// type: user/updateUser
        
        removeUser: (state, action)=>{
            let removeUser = state.data;
                removeUser.user = removeUser.filter(user => user.id != action.payload.id)
            state.data = removeUser
        }
    }
})
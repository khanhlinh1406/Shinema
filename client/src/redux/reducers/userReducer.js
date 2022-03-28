const initState = {
    data: [],
    user: {}
}

export const UserReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            addUser(state, action)
        case 'UPDATE_USER':
            updateUser(state, action)
        case 'REMOVE_USER':
            removeUser(state, action)

        default:
            return state;
    }
}

export default UserReducer

const addUser = (state, action) => {
    const newState = {
        ...state,   
        data:[...state.data, action.payload],
    }
    return newState;
}

const updateUser = (state, action) => {
    let updateData = state.data;
    updateData = updateData.map(user => {
        if (user.id == action.payload.id)
            return action.payload
        else return user
    })

    const newState = {
        ...state,
        data: updateData
    }
    return newState;
}

const removeUser = (state, action) => {
    let removeUser = state.data;
    removeUser.user = removeUser.filter(user => user.id != action.payload.id)

    const newState ={
        ...state,
        data: removeUser
    }

    return newState;
}
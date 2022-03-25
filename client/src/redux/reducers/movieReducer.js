const initState = {
    data: [],
    movie: {}
}

export const MovieReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_MOVIE':
            addUser(state, action)
        case 'UPDATE_MOVIE':
            updateUser(state, action)
        case 'REMOVE_MOVIE':
            removeUser(state, action)

        default:
            return state;
    }
}

addMovie = (state, action) => {
    return {
        ...state,
        data: action.payload
    }
}

updateMovie = (state, action) => {
    let updateData = state.data;
    updateData = updateData.map(movie => {
        if (movie.id == action.payload.id)
            return action.payload
        else return movie
    })

    return {
        ...state,
        data: updateData
    }
}

removeMovie = (state, action) => {
    let removeMovie = state.data;
    removeMovie.movie = removeMovie.filter(movie => movie.id != action.payload.id)

    return {
        ...state,
        data: removeUser
    }
}
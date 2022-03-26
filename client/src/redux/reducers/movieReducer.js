const initState = {
    data: [],
    movie: {}
}

export const MovieReducer = (state = initState, action) => {
   /// console.log(action.type);
    switch (action.type) {
        
        case 'ADD_MOVIE':
            addMovie(state, action)
        case 'UPDATE_MOVIE':
            updateMovie(state, action)
        case 'REMOVE_MOVIE':
            removeMovie(state, action)

        default:
            return state;
    }
}

export default MovieReducer

const addMovie = (state, action) => {
  ///  console.log('Add new movie')
    return {
        ...state,
        data: [
            ...state.data,
            action.payload
        ]
    }
}

const updateMovie = (state, action) => {
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

const removeMovie = (state, action) => {
    let removeMovie = state.data;
    removeMovie.movie = removeMovie.filter(movie => movie.id != action.payload.id)

    return {
        ...state,
        data: removeMovie
    }
}
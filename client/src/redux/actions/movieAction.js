export const add = (movieObj) =>{
    return {
        type: 'ADD_MOVIE',
        payload: movieObj
    }
}

export const update = (movieObj) =>{
    return {
        type: 'UPDATE_MOVIE',
        payload: movieObj
    }
}

export const remove = (movieObj) =>{
    return {
        type: 'REMOVE_MOVIE',
        payload: movieObj
    }
}
export const add = (movie) =>{
    return {
        type: 'ADD_MOVIE',
        payload: movie
    }
}

export const update = (movie) =>{
    return {
        type: 'UPDATE_MOVIE',
        payload: movie
    }
}

export const remove = (movie) =>{
    return {
        type: 'REMOVE_MOVIE',
        payload: movie
    }
}
export const add = (user) =>{
    return {
        type: 'ADD_USER',
        payload: user
    }
}

export const update = (user) =>{
    return {
        type: 'UPDATE_USER',
        payload: user
    }
}

export const remove = (user) =>{
    return {
        type: 'REMOVE_USER',
        payload: user
    }
}
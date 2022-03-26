export const add = (userObj) =>{
    return {
        type: 'ADD_USER',
        payload: userObj
    }
}

export const update = (userObj) =>{
    return {
        type: 'UPDATE_USER',
        payload: userObj
    }
}

export const remove = (userObj) =>{
    return {
        type: 'REMOVE_USER',
        payload: userObj
    }
}
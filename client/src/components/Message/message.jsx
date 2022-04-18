import React from 'react';
import { BiError } from 'react-icons/bi'


const Message = props => {
    const mess = props.message;
    const type = props.type

    return (
        <div className="login__form__message" style={{ color: type == 'err' ? 'rgb(192, 7, 7)' : '#e9be00' }}>
            <BiError size={15} />
            <p>{mess}</p>
        </div >
    )
}

export default Message
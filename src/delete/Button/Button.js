import React from 'react';
import './Button.css'

export const Button = ({ title, click }) => {
    return (
        <button
            className='button'
            onClick={click}
        >
            {title}
        </button>
    )
}
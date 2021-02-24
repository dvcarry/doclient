import React from 'react';
import './Action.css'

export const Action = ({ type }) => {

    const classes = ['action']
    if (type) {
        classes.push(type)
    }

    return (
        <div
            className={classes.join(' ')}
        >
        </div>
    )
}
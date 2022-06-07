import React from 'react';
import './Action.css'

export const Action = ({ important, date }) => {

    const classes = ['action']
    if (important) {
        classes.push('important')
    }

    return (
        <div
            className={classes.join(' ')}
        >
        </div>
    )
}
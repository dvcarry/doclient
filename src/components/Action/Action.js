import React from 'react';
import './Action.css'

export const Action = ({ important, date, wait }) => {

    const classes = ['action']
    if (important) {
        classes.push('important')
    }
    if (wait) {
        classes.push('wait')
    }

    return (
        <div
            className={classes.join(' ')}
        >
        </div>
    )
}
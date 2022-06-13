import React from 'react';
import './SidebarItem.css'

export const SidebarItem = ({ name, active, click, amount }) => {

    let classes = ['sidebaritem']
    if (active) {
        classes.push('active')
    }

    return (
        <div
            className={classes.join(' ')}
            onClick={click}
        >
            <span>
                {name}
            </span>
            <span>
                {amount}
            </span>
        </div>
    )
}
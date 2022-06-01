import React from 'react';


import './Fail.css'



export const Fail = ({ id, name, value }) => {

    let classes = ['fail']

    if (value > 6) {
        classes.push('fail_urgent')
    } else if (value > 2 && value < 7) {
        classes.push('fail_middle')
    }


    return (
        <div
            className={classes.join(' ')}
        >
            <span>
                {name}
            </span>
            <span>
                {value}
            </span>
            {/* <div>
                <span>
                    {days}
                </span>
                <span>
                    -
            </span>
                <span>
                    {total}
                </span>
            </div> */}

        </div>
    )
}
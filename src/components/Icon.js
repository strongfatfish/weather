import React from 'react';

function Icon({ icon }) {
    return (
        <svg className="icon" aria-hidden="true">
            <use xlinkHref={`#icon-${icon}`}/>
        </svg>
    );
}

export default Icon;
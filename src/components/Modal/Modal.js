import React from 'react';
const modal = (props) => {
    return (
        <div style={{display: props.isVisible ? 'block' : 'none'}}>
            <h1>MY MODAL IS ALIVE!!!!!!!!!!!</h1>
        </div>
    )
};

export default modal;
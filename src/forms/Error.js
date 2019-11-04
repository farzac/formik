import React from 'react'

const error = props => {
    return (
        <div style={{color: "red", marginTop: "0.5rem"}}>
            {props.children}
        </div>

    );
}
export default error;
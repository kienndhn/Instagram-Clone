import React from 'react'

const Avatar = ({ src, w }) => {
    return (
        <div
            style={{
                width: `${w}px`,
                height: `${w}px`,
                backgroundImage: `url("/storage/${src}")`,
                backgroundSize: 'cover',
                display: 'block',
                borderRadius: '50%'
            }}
        >
        </div>
    )
}

export default Avatar
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShareModal = ({ post }) => {
    const dispatch = useDispatch()

    return (
        <ul className="list-group">
            <li className="btn list-group-item">Copy Link</li>
            <li className="btn list-group-item" onClick={(e) => {
                dispatch({ type: "SHOW_MODAL", payload: { show: false } })
            }}>Cancel</li>
        </ul>
    )
}

export default ShareModal
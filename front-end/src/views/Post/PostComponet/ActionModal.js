import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { follow } from '../../../redux/actions/followActions'

const ActionModal = ({ post }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <>
            <ul className="list-group">
                {post.user.username != userInfo.username &&
                    <a href="#"
                        onClick={(e) => {
                            dispatch(follow(post.user.username));
                        }}
                    >
                        <li className="btn list-group-item">Unfollow</li>
                    </a>}
                <a href={`post/${post.id}`}>
                    <li className="btn list-group-item">Go to post</li>
                </a>
                <li className="btn list-group-item" onClick={(e) => {
                    dispatch({ type: "SHOW_MODAL", payload: { show: false } })
                }}>Cancel</li>
            </ul>
        </>

    )
}

export default ActionModal
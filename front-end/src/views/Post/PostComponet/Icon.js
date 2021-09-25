import { faComment, faHeart as farHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import LikeModal from '../../../components/LikeModal'
import Modal from '../../../components/Modal'
import { like } from '../../../redux/actions/postActions'
// import { POST_LIKE_RESET } from '../../../redux/contants/postContants'
import ShareModal from './ShareModal'

const Icon = ({ post, state }) => {

    const dispatch = useDispatch()

    const postLike = useSelector(state => state.postLike)
    const { likeState, success } = postLike

    const [lstate, setlstate] = useState(false)

    const [number, setnumber] = useState(0)

    useEffect(() => {

        if (likeState) {
            setnumber(likeState.numberLike)
        } else {
            setlstate(state)
            setnumber(post.likes)
        }

    }, [state, post, likeState, number])


    const likeSubmit = () => {
        dispatch(like(post.id))
        setlstate(!lstate)
    }

    return (
        // <div className="py-2 px-3 border">
        <>
            <div className="d-flex flex-row">

                <div className="btn pl-0" onClick={likeSubmit} >
                    {!lstate ?
                        <FontAwesomeIcon icon={farHeart} size="2x" className="like" /> :

                        <FontAwesomeIcon icon={faHeart} size="2x" color="red" className="liked" />
                    }

                    {/* <LikeIcon state={lstate} /> */}
                </div>


                <div className="btn pl-0">
                    <FontAwesomeIcon icon={faComment} size="2x" />
                </div>

                <div className="btn pl-0" onClick={(e) => {
                    dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <ShareModal post={post} /> } })
                }} >
                    <FontAwesomeIcon icon={faShareSquare} size="2x" />
                </div>


            </div>
            {number > 0 &&
                <a className="m-0 text-dark text-decoration-none btn p-0" onClick={(e) => {
                    dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <LikeModal post={post} /> } })
                }}><strong>{number} likes</strong>
                </a>}
        </>
        // </div>
    )
}

export default Icon
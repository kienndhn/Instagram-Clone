import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PostHove = ({ likes, commentsNumber }) => {
    return (
        <div className="post-hover justify-content-center">
            <div className="d-flex flex-md-row flex-column justify-content-center" >
                <div className="d-flex flex-row align-items-center p-2">
                    <FontAwesomeIcon icon={faHeart} size="1x" style={{marginRight:"1rem"}} /> {likes}
                </div>
                <div className="d-flex flex-row align-items-center p-2">
                    <FontAwesomeIcon icon={faComment} size="1x" style={{marginRight:"1rem"}} /> {commentsNumber}
                </div>
            </div>
        </div>
    )
}

export default PostHove
import React from 'react'
import CommentForm from './CommentForm'
import Icon from './Icon'

const PostFooter = ({post}) => {

    const submitHandler = (e) => {

    }
    return (
        <div className="card-footer align-self-end w-100 p-0 border-top-0">
            <Icon />
            <CommentForm post={post} />
        </div>
    )
}

export default PostFooter
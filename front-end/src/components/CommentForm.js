import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from '../redux/actions/commentActions'

const CommentForm = ({ post }) => {

    const [body, setBody] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (body !== '') {
            dispatch(store(post.id, body))
            setBody("")
        }
    }

    return (
        <form
            onSubmit={(e) => submitHandler(e)}
        >
            <div className="form-group mb-0 text-muted">
                <div className="input-group is-invalid">
                    <textarea
                        className="form-control py-2 px-3"
                        name='body'
                        rows="1"
                        placeholder="Add a comment..."
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    >

                    </textarea>
                    <div className="input-group-append border-0">
                        <button className="btn btn-md btn-info" style={{ zIndex: "0" }} type="submit">Post</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CommentForm
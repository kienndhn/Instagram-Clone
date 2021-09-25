import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useEventCallback } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import Avatar from '../../components/Avatar'
import CommentForm from '../../components/CommentForm'
import { index as getPost } from '../../redux/actions/postActions'

import ActionModal from './PostComponet/ActionModal'
import Icon from './PostComponet/Icon'

const PostIndex = ({ history }) => {

    const dispatch = useDispatch()

    const postIndex = useSelector(state => state.postIndex)
    const { loading, posts, user, suggest } = postIndex

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileIndex = useSelector(state => state.profileIndex)
    const { profileInfo } = profileIndex

    const [page, setPage] = useState(1)

    const getNextPosts = useCallback(
        () => {
            setPage(page + 1)
        }, [page]
    )

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        // if (!posts) {
        //     dispatch(getPost(page))
        // }
        // else {
        //     // console.log(posts)
        // }
    }, [dispatch, userInfo, posts, loading])

    useEffect(() => {
        dispatch(getPost(page))
    }, [page])

    return (
        <>
            {
                !loading &&
                
                <div className="d-flex flex-row justify-content-center no-gutters" >
                    <main className="main col-md-8 px-md-2 py-md-3" >
                        {posts && posts.length > 0 ?
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={(getNextPosts)}
                                hasMore={true}
                                style={{ overflowX: "hidden" }}
                            >
                                {
                                    posts.map((post) => (
                                        <div className="card mx-auto custom-card mb-2 mb-md-5" key={post.id}>
                                            <div className="card-header d-flex justify-content-between align-items-center bg-white pl-3 pr-1 py-2">
                                                <div className="d-flex align-items-center">
                                                    <a href={`/profile/${post.user.username}`} >
                                                        <Avatar src={post.user.image} w={32} />
                                                    </a>
                                                    <a href={`/profile/${post.user.username}`} className="my-0 ml-3 text-dark text-decoration-none">
                                                        <strong>{post.user.name}</strong>
                                                    </a>
                                                </div>
                                                <div className="card-dots">
                                                    < button type="button" className="btn btn-link text-muted"
                                                        onClick={(e) => {
                                                            dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <ActionModal post={post} /> } })
                                                        }}>
                                                        <FontAwesomeIcon icon={faEllipsisH} />
                                                    </button>
                                                </div>
                                            </div>

                                            <img className="card-img" src={`/storage/${post.images[0].path}`} />

                                            <div className="card-body px-3 py-2">
                                                <Icon post={post} state={post.state} />

                                                <p className="card-title m-0">
                                                    <a href={`/profile/${post.user.username}`} className="text-dark text-decoration-none my-0">
                                                        <strong>{post.user.name}</strong>
                                                    </a> {post.caption}
                                                </p>

                                                <div className="comment">
                                                    {
                                                        post.comments_number > 0
                                                        &&
                                                        <a className="text-muted" href={`/post/${post.id}`}>View all {post.comments_number} comments</a>
                                                    }

                                                    {
                                                        post.comments.map((comment) => (

                                                            <p className="mb-1" key={comment.id}>
                                                                <a href={`/profile/${comment.username}`} className="text-decoration-none text-dark"><strong>{comment.name}</strong></a> {comment.body}</p>
                                                        ))
                                                    }
                                                    <p className="text-muted card-text"><ReactTimeAgo date={new Date(post.created_at)} locale="en-US" /></p>
                                                </div>
                                            </div>
                                            <div className="card-footer p-0">
                                                <CommentForm post={post} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </InfiniteScroll>
                            :
                            <div className="d-flex justify-content-center p-3 py-5 border bg-white">
                                <div className="card border-0 text-center">
                                    <img src="/storage/img/nopost.png" className="card-img-top" />
                                </div>
                            </div>
                        }
                    </main>
                    {user &&
                        <aside className="d-md-flex d-none col-md-4 py-3" style={{height:"100vh"}}>
                            <div className="position-fixed">
                                <div className="d-flex align-items-center pl-3">
                                    <a href={`/profile/${user.username}`} >
                                        <Avatar src={user.image} w={56} />
                                    </a>
                                    <div className="d-flex  flex-column pl-3">
                                        <a href={`/profile/${user.username}`} className="h6 m-0 text-dark text-decoration-none">
                                            <strong>{user.username}</strong>
                                        </a>
                                        <small className="text-muted">{user.name}</small>
                                    </div>
                                </div>

                                <div className="my-4 py-2 pl-3" style={{ width: "300px" }}>
                                    <h5 className="text-secondary">Suggestions For You</h5>

                                    {suggest &&
                                        suggest.map((user) => (
                                            <div className="suggestions py-2" key={user.id}>
                                                <div className="d-flex align-items-center">
                                                    <a href={`/profile/${user.username}`}>
                                                        <Avatar src={user.profile.image} w={32} />
                                                    </a>
                                                    <div className="d-flex flex-column pl-3">
                                                        <a href={`/profile/${user.username}`} className="h6 text-decoration-none text-dark m-0">
                                                            <strong>{user.name}</strong>
                                                        </a>
                                                        <small className="text-muted">New to Instagram </small>
                                                    </div>
                                                    <a href="#" className="ml-auto text-info text-decoration-none">Follow</a>
                                                </div>
                                            </div>
                                        ))

                                    }
                                </div>

                                <div className="pl-3">
                                    <span style={{ color: "#a6b3be" }}>© 2021 Instagram clone</span>
                                </div>
                            </div>
                        </aside>
                    }
                </div>

            }
        </>
    )
}

export default PostIndex
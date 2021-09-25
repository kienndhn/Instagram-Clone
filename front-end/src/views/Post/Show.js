// import { Container, Grid } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useMediaQuery } from 'react-responsive'
import { index, store } from '../../redux/actions/commentActions'
import { show } from '../../redux/actions/postActions'
import { COMMENT_STORE_RESET } from '../../redux/contants/commentContants'

import Comment from '../../components/Comment'
import Caption from './PostComponet/PostCaption'
import Icon from './PostComponet/Icon'
import CommentForm from '../../components/CommentForm'
import Gallery from './PostComponet/ImageGallery'
import InfiniteScroll from "react-infinite-scroll-component";

import { v1 } from 'uuid'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import Avatar from '../../components/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import ActionModal from './PostComponet/ActionModal'
import PostCard from '../Profile/ProfileComponent/PostCard'

const PostShow = ({ history, match }) => {

    // const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })

    const dispatch = useDispatch()

    const postShow = useSelector(state => state.postShow)
    const { loading, postInfo, error } = postShow

    const commentIndex = useSelector(state => state.commentIndex)
    const { loading: commentLoading, comments } = commentIndex

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const commentStore = useSelector(state => state.commentStore)
    const { success } = commentStore

    // const [body, setBody] = useState('')

    const [lstate, setlState] = useState('')

    const [page, setPage] = useState(1)

    const getNextComment = useCallback(
        () => {
            setPage(page + 1)
        },
        [page]
    )

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }
        if (!postInfo) {
            dispatch(show(match.params.id))

        } else {
            setlState(postInfo.post.state)
        }
        if (success) {
            dispatch({ type: COMMENT_STORE_RESET })
        }

    }, [dispatch, userInfo, success, postInfo])

    useEffect(() => {
        dispatch(index(match.params.id, page))
    }, [page])


    return (

        <>
            {/* <div className="d-flex flex-column"> */}
            {postInfo &&
                <>
                    <div className="d-flex flex-row w-auto justify-content-center">
                        <main className="main" >
                            <div className="card w-auto">
                                <div className="d-flex flex-md-row flex-column no-gutters ">

                                    <div className="card-header d-md-none d-flex mr-auto w-100 bg-white">
                                        <div className="d-flex align-items-center w-100">

                                            <Avatar src={`${postInfo.post.user.profile.image}`} w={32} />
                                            <div className="d-flex flex-column">
                                                <a href={`/profile/${postInfo.post.user.username}`} className="my-0 ml-3 text-dark text-decoration-none">
                                                    <strong>{postInfo.post.user.name}</strong>
                                                </a>
                                                <p className="my-0 ml-3"><small className="text-muted"><ReactTimeAgo date={new Date(postInfo.post.created_at)} locale="en-US" /></small></p>
                                            </div>

                                            {/* <p className="my-0 ml-1 text-dark"> <strong> - Following </strong></p> */}

                                            <div className="card-dots d-flex ml-auto">
                                                < button type="button" className="btn btn-link text-muted"
                                                    onClick={(e) => {
                                                        dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <ActionModal post={postInfo.post} /> } })
                                                    }}>
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-title p-2 d-md-none d-flex">
                                        {<div>postInfo.post.caption</div>}
                                    </div>

                                    <div className="w-100">
                                        <div className="mx-auto col p-0 gallery-container" style={{ zIndex: "0", maxHeight: "600px" }}>
                                            <Gallery images={postInfo.post.images} />
                                        </div>
                                    </div>



                                    <div className="col-auto d-md-flex d-none"
                                        style={{ borderLeft: "solid 1px rgba(0, 0, 0, 0.125)", width: "335px" }}
                                    >
                                        <div className="d-flex flex-column" style={{ width: "335px", height: "100%", position: "absolute" }}>
                                            <div className="card-header">
                                                <div className="d-flex align-items-center">

                                                    <Avatar src={`${postInfo.post.user.profile.image}`} w={32} />

                                                    <a href={`/profile/${postInfo.post.user.username}`} className="my-0 ml-3 text-dark text-decoration-none">
                                                        <strong>{postInfo.post.user.name}</strong>
                                                    </a>
                                                    <p className="my-0 ml-1 text-dark"> <strong> - Following </strong></p>

                                                    <div className="card-dots d-flex ml-auto">
                                                        < button type="button" className="btn btn-link text-muted"
                                                            onClick={(e) => {
                                                                dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <ActionModal post={postInfo.post} /> } })
                                                            }}>
                                                            <FontAwesomeIcon icon={faEllipsisH} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body" id="scrollableDiv" style={{ overflowY: "-moz-initial", overflowX: "hidden" }}>
                                                <Caption post={postInfo.post} />

                                                {(comments) &&
                                                    <InfiniteScroll
                                                        dataLength={comments.length}
                                                        next={getNextComment}
                                                        hasMore={true}
                                                        style={{ overflowX: "hidden" }}
                                                        scrollableTarget="scrollableDiv"
                                                    >
                                                        {
                                                            comments.map((comment) => (
                                                                <Comment comment={comment} key={comment.id + v1()} image={comment.image} />
                                                            ))
                                                        }
                                                    </InfiniteScroll>}
                                            </div>
                                            <div className="card-footer align-self-end w-100 p-0 border-top-0">

                                                <div className="py-2 px-3 border card-img">
                                                    <Icon post={postInfo.post} state={lstate} />
                                                    <p className="m-0"><small className="text-muted"><ReactTimeAgo date={new Date(postInfo.post.created_at)} locale="en-US" /></small></p>
                                                </div>
                                                <CommentForm post={postInfo.post} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-md-none d-flex flex-column p-0 bg-white">
                                        <div className="card-footer align-self-end w-100 p-0 border-top-0 bg-white">
                                            <div className="py-2 px-3 border">
                                                <Icon post={postInfo.post} state={lstate} />
                                                <p className="m-0"><small className="text-muted"><ReactTimeAgo date={new Date(postInfo.post.created_at)} locale="en-US" /></small></p>
                                            </div>
                                            <CommentForm post={postInfo.post} />
                                        </div>
                                        <div className="card-body pt-0 flex-column d-flex nowrap">
                                            {(comments) &&

                                                comments.map((comment) => (
                                                    <Comment comment={comment} key={comment.id + v1()} image={comment.image} />
                                                ))

                                            }
                                            <div className="text-center font-weight-bold d-flex mt-3 justify-content-center"
                                                onClick={getNextComment} role="button"
                                            >
                                                Load more...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div className="suggest-posts">
                        <hr className="my-5" />
                        <h6 className="text-muted text-center">More posts from
                            <a href={`/profile/${postInfo.post.user.username}`} className="text-dark text-decoration-none">
                                <strong> {postInfo.post.user.name}</strong>
                            </a>
                        </h6>
                        <div className="post-container">
                            {
                                postInfo.posts.map((post) => (
                                    <PostCard post={post} key={post.id} />
                                ))
                            }
                        </div>
                    </div>
                </>

            }

            <div className="d-none d-md-flex justify-content-center" style={{ marginTop: "100px" }}>
                <span style={{ color: "#a6b3be" }}>© 2021 Instagram clone</span>
            </div>
            {/* </div > */}
        </>
    )
}

export default PostShow
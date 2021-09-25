import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { likeIndex } from '../redux/actions/postActions'
import { POST_LIKE_INDEX_RESET } from '../redux/contants/postContants'
import Avatar from './Avatar'



const UserModal = () => {
    const dispatch = useDispatch()

    const followersList = useSelector(state => state.followersList)
    const { result } = followersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // const [number, setNumber] = useState(1)

    // const getNextLike = useCallback(
    //     () => {
    //         setNumber(number + 1)
    //         console.log(number)
    //     }
    //     , [number]
    // )

    // useEffect(() => {
    //     dispatch(likeIndex(post.id, number))
    // }, [dispatch, number])

    return (
        <>
            {/* <div className='d-flex no-gutters w-100'> */}
            <div className='d-flex flex-column no-gutters w-100'>
                <div className="d-flex flex-row no-gutters justify-content-between text-center border-bottom align-items-center" style={{ height: "43px" }}>
                    <div className="col-1">
                    </div>
                    <div className="col-2">
                        {/* Likes */}
                    </div>
                    <div className="col-1 btn p-0"
                        onClick={(e) => {
                            dispatch({ type: "SHOW_MODAL", payload: { show: false } })
                            // dispatch({ type: POST_LIKE_INDEX_RESET })
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <div className="d-flex flex-row no-gutters justify-content-center" style={{ maxHeight: "356px", minHeight: "200px", overflowY: "auto" }}>
                    <ul className="list-group w-100" style={{ height: "356px" }}>
                        {/* {likes &&
                            <InfiniteScroll
                                dataLength={likes.length}
                                next={(e) => {
                                    setNumber(number + 1)
                                    console.log(number)
                                }}
                                hasMore={true}
                                height={356}
                                style={{ overflowX: "hidden" }}
                            > */}
                        {result&&
                            result.map((user) => (

                                <div className=" d-flex flex-row no-gutters align-items-center list-user" key={user.id} style={{ padding: "8px 16px" }}>
                                    <div style={{ marginRight: "12px" }}>
                                        <a href={`/profile/${user.username}`}>
                                            <Avatar w={44} src={user.image} />
                                        </a>
                                    </div>

                                    <div className="d-flex flex-column w-100">
                                        <a className="text-dark text-decoration-none" href={`/profile/${user.username}`}>
                                            <p className="m-0" style={{ fontWeight: '600' }}>{user.username}</p>
                                        </a>
                                        <p className="m-0">{user.name}</p>
                                    </div>
                                    {
                                        userInfo.username !== user.username ?
                                            (
                                                !user.is_follow ?
                                                    <div className="d-flex mr-auto">
                                                        <a className="btn btn-primary" role="button">
                                                            Follow
                                                        </a>
                                                    </div>
                                                    : <div className="d-flex mr-auto">
                                                        <a className="btn btn-primary" role="button">
                                                            Unfollow
                                                        </a>
                                                    </div>
                                            )
                                            : <></>
                                    }
                                </div>

                            ))

                        }
                        {/* </InfiniteScroll> */}
                        {/* } */}
                    </ul>
                </div>
            </div>
            {/* </div> */}
        </>

    )
}

export default UserModal
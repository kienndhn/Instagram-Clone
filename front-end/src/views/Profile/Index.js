import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useMediaQuery } from 'react-responsive'
import Avatar from '../../components/Avatar';
import UserModal from '../../components/UserModal';
import { follow, followers, following } from '../../redux/actions/followActions';
import { index } from '../../redux/actions/profileActions';
import PostCard from './ProfileComponent/PostCard';

const ProfileIndex = ({ history, match }) => {

    const profileIndex = useSelector(state => state.profileIndex)
    const { loading, profileInfo, error } = profileIndex

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isFollow, setIsFollow] = useState('')

    const dispatch = useDispatch()

    const followHandler = () => {
        setIsFollow(!isFollow)
        dispatch(follow(profileInfo.user.username))
    }

    useEffect(() => {
        // if(!user)
        if (!profileInfo) {
            dispatch(index(match.params.username))
        } else {
            setIsFollow(profileInfo.follow)
        }
        // console.log(userInfo)
    }, [dispatch, userInfo, profileInfo])

    // const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 769px)' })



    return (
        <>
            {
                !loading ?
                    (
                        profileInfo &&
                        <div className='d-flex flex-column align-content-center' >
                            {
                                <>
                                    <div className='d-md-flex flex-row pb-4 d-none border-bottom' style={{}} >
                                        <div className='d-flex flex-column ml-auto' style={{ marginRight: "30px", position: "relative" }} >
                                            <canvas style={{ height: "168px", width: "168px", position: "absolute", top: "-9px", left: "-9px" }} >

                                            </canvas>
                                            <a href="#" >
                                                <Avatar src={profileInfo.user.profile.image}
                                                    w={150}
                                                />
                                            </a>
                                        </div>

                                        <div className="d-flex flex-column mx-auto "  >
                                            <div className="d-flex flex-row align-items-center justify-content-start" style={{ marginBottom: "30px" }} >
                                                <h2 className='fs-2 m-0 font-weight-light' style={{ fontWeight: "300" }} > {profileInfo.user.username} </h2>

                                                {
                                                    userInfo && userInfo.username === profileInfo.user.username ?
                                                        <>
                                                            <a className='btn btn-outline-primary ml-3 text-dark text-decoration-none font-weight-bold'
                                                                href={`/profile/${profileInfo.user.username}/edit`}
                                                                role='button'> Edit Profile </a>
                                                        </>
                                                        :
                                                        <div className='btn btn-primary ml-3'
                                                            role='button'
                                                            onClick={followHandler} > {!isFollow ? 'Follow' : 'Unfollow'}
                                                        </div>
                                                }
                                            </div>


                                            <div className="d-flex flex-row mt-1" style={{ marginBottom: "20px", fontSize: "1rem" }} >
                                                <div className="d-flex flex-row" style={{ marginRight: "40px", fontSize: "16px" }} > <strong style={{ marginRight: "1ex" }}> {profileInfo.postCount} </strong> posts</div >
                                                <a
                                                    onClick={(e) => {
                                                        dispatch(followers(profileInfo.user.username))
                                                        dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <UserModal /> } })
                                                    }}
                                                    className="d-flex flex-row" style={{ marginRight: "40px", fontSize: "16px", cursor:"pointer"  }} > <strong style={{ marginRight: "1ex" }}> {profileInfo.followersCount} </strong> followers</a >
                                                <a
                                                    onClick={(e) => {
                                                        dispatch(following(profileInfo.user.username))
                                                        dispatch({ type: "SHOW_MODAL", payload: { show: true, children: <UserModal /> } })
                                                    }}
                                                    className="d-flex flex-row" style={{ marginRight: "40px", fontSize: "16px", cursor:"pointer" }} > <strong style={{ marginRight: "1ex" }}> {profileInfo.followingCount} </strong> following</a >
                                            </div>

                                            <div className="d-flex flex-column">
                                                <h1 className="font-weight-bold" style={{ fontSize: "2em" }}>{profileInfo.user.name}</h1>

                                                <span>{profileInfo.user.profile.bio}</span>
                                                <a href="#" className="font-weight-bold"
                                                    target="_blank" > {profileInfo.user.profile.website}
                                                </a>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="d-flex d-md-none flex-column no-gutter">
                                        <div className="mt-4 px-3 " >
                                            <div className="d-flex flex-row pb-2" >
                                                <div className="pr-3 d-flex flex-column mr-3" >
                                                    <a href="#" >
                                                        < Avatar src={profileInfo.user.profile.image}
                                                            w={77}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="flex-column d-flex ml-0" >
                                                    <div> < h2 className="fa-1" > {profileInfo.user.username} </h2>
                                                    </div>
                                                    <div>
                                                        {
                                                            userInfo && userInfo.username === profileInfo.user.username ?
                                                                <a className='btn btn-outline-primary py-0 '
                                                                    href={`/profile/${profileInfo.user.username}/edit`}
                                                                    role='button' >
                                                                    Edit Profile </a> :
                                                                <a className='btn btn-outline-primary py-0'
                                                                    href='#'
                                                                    role='button' > {isFollow ? "Follow" : "Unfollow"}
                                                                </a>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-row pb-4 ' >
                                                <div className="d-flex flex-column pt-1 w-100 ">
                                                    <h1 className="font-weight-bold" style={{ fontSize: "2em" }}>{profileInfo.user.name}</h1>

                                                    <span className="break-all text-break">{profileInfo.user.profile.bio}</span>
                                                    <a href="#" className="font-weight-bold"
                                                        target="_blank" > {profileInfo.user.profile.website}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row justify-content-around border-top border-bottom text-center" style={{ height: "52.8px" }}>
                                                <div className="d-flex flex-column"><strong>{profileInfo.postCount}</strong>post</div>
                                                <div className="d-flex flex-column"><strong>{profileInfo.followersCount}</strong>followers</div>
                                                <div className="d-flex flex-column"><strong>{profileInfo.followingCount}</strong>following</div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            }
                            {
                                !loading ? (profileInfo.user.posts.length > 0 ?
                                    <div className="post-container">
                                        {
                                            profileInfo.user.posts.map((post) => (
                                                <PostCard post={post} key={post.id} />
                                            ))
                                        }
                                    </div>
                                    :
                                    <div className="card border-0 text-center bg-transparent">
                                        <img src="/storage/img/noimage.png" className="card-img-top" alt="..." />
                                        <div className="card-body ">
                                            <h1>No Posts Yet</h1>
                                        </div>
                                    </div>)
                                    : <></>
                            }
                        </div>
                    )
                    :
                    <></>
            }
            <div className="d-none d-md-flex justify-content-center" style={{ marginTop: "100px" }}>
                <span style={{ color: "#a6b3be" }}>© 2021 Instagram clone</span>
            </div>
        </>
    )
}

export default ProfileIndex
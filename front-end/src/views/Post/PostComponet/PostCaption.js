import React from 'react'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import vi from 'javascript-time-ago/locale/vi'

import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(vi)



const Caption = ({ post }) => {
    return (
        <>
            <div className="row" >
                <div className="col-2">
                    <a href={`/profile/${post.user.username}`}>
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundImage: `url("/storage/${post.user.profile.image}")`,
                                backgroundSize: 'cover',
                                display: 'block',
                                borderRadius: '50%'
                            }}
                        ></div>
                    </a>
                </div>

                <div className="col-10 pl-0">
                    <div className="row">
                        <div className="col">
                            <div className="m-0 text-dark">
                                <a href={`/profile/${post.user.profile.username}`} className="my-0 text-dark text-decoration-none">
                                    <strong> {post.user.name} </strong>
                                </a>
                                <span dangerouslySetInnerHTML={{__html:post.caption}}
                                ></span>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">
                            <p>
                            <ReactTimeAgo date={new Date(post.created_at)} locale="en-US"/>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Caption
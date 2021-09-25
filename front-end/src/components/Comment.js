

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import vi from 'javascript-time-ago/locale/vi'

import ReactTimeAgo from 'react-time-ago'

// TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(vi)

import React from 'react'
import Avatar from './Avatar'

const Comment = ({ comment }) => {
    return (
        <>
            <div className="d-flex flex-row mt-3" >
                <div className="p-0 mr-0 d-flex flex-column">
                    <a href={`/profile/${comment.username}`}>
                        
                        <Avatar src={comment.image} w={32} />
                    </a>
                </div>

                <div className="col-10 pl-0 ml-3 d-flex flex-column" >
                    <div className="row">
                        <div className="col">
                            <div className="m-0 text-dark">
                                <a href={`/profile/${comment.username}`} className="my-0 text-dark text-decoration-none">
                                    <strong> {comment.name} </strong>
                                </a>
                                {comment.body}
                            </div>
                        </div>

                    </div>
                    <div className="row mt-1">
                        <div className="col">
                            <ReactTimeAgo date={new Date(comment.created_at)} locale="en-US" />
                        </div>

                    </div>
                </div>
            </div>


            {/* <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Link href={`/profile/${comment.username}`} >
                        <Avatar alt={comment.username} src={`/storage/${comment.image}`} />
                    </Link>
                </Grid>
                <Grid item justifyContent="left" >
                    <Link href={`/profile/${comment.username}`} className="text-dark text-decoration-none" style={{textAlign:"left"}}>
                        <Typography>
                            {comment.name}
                        </Typography>
                    </Link>
                    <Typography>
                        {comment.body}
                    </Typography>


                </Grid>

            </Grid> */}
        </>
    )
}

export default Comment
import React, { useState } from 'react'
import PostHove from './PostHove'

const PostCard = ({ post }) => {

    const [hidden, setHidden] = useState(true)

    return (
        <div className="post-card">
            <a href={`/post/${post.id}`}
                onMouseEnter={(e) => setHidden(false)}
                onMouseLeave={(e) => setHidden(true)}
            >
                <div className="img border post-image"
                    style={{
                        backgroundImage: `url('/storage/${post.images[0].path}')`
                    }}
                >

                </div>
                
                {
                    !hidden && < PostHove likes={post.likes} commentsNumber={post.comments_number} />
                }

            </a>
        </div>
    )
}

export default PostCard
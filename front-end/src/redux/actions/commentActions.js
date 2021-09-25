import axios from "axios";

import { COMMENT_INDEX_REQUEST, COMMENT_INDEX_SUCCESS, COMMENT_STORE_REQUEST, COMMENT_STORE_SUCCESS } from '../contants/commentContants'

export const index = (post_id, page) => async (dispatch, getState) => {
    dispatch({ type: COMMENT_INDEX_REQUEST })

    const { userLogin: { userInfo } } = getState()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }

    const { data } = await axios.get(
        `/api/comments/${post_id}?page=${page}`, config
    )

    // console.log(data)
    // const {comments: {comments} } = getState()

    dispatch({ type: COMMENT_INDEX_SUCCESS, payload: data.comments })
}

export const store = (post_id, body) => async (dispatch, getState) => {
    // try{
    // dispatch({type: COMMENT_STORE_REQUEST})

    const { userLogin: { userInfo } } = getState()

    const config = {
        headers: {
            "Content-Type": "appliication/json",
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }

    const { data } = await axios.post(
        '/api/comments/store', { post_id, body }, config
    )

    //


    dispatch({ type: COMMENT_STORE_SUCCESS, payload: data.comment })

    // }
    // catch{

    // }
}
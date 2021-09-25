import axios from "axios";
import { v1 } from "uuid";

import {
    POST_STORE_FAIL,
    POST_STORE_SUCCESS,
    POST_STORE_REQUEST,
    POST_SHOW_REQUEST,
    POST_SHOW_SUCCESS,
    POST_SHOW_FAIL,
    POST_LIKE_SUCCESS,
    POST_INDEX_SUCCESS,
    POST_INDEX_REQUEST,
    POST_LIKE_INDEX
} from '../contants/postContants'

export const store = (fd) => async (dispatch, getState) => {
    try {

        dispatch({ type: POST_STORE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.post(
            '/api/post',
            fd,
            config
        )

        dispatch({
            type: POST_STORE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: POST_STORE_FAIL,
            payload: error
        })
    }
}

export const show = (post) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_SHOW_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = userInfo ? {
            headers: {
                'Content-Type': "application/json",
                Authorization: `${userInfo.token_type} ${userInfo.access_token}`
            }
        } : {
            headers: {
                'Content-Type': "application/json",
            }
        }

        const { data } = await axios.get(
            `/api/post/${post}`,
            config
        )

        dispatch({
            type: POST_SHOW_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: POST_SHOW_FAIL,
            payload: error
        })
    }
}


export const index = (page) => async (dispatch, getState) => {

    dispatch({ type: POST_INDEX_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
        headers: {
            'Content-Type': "application/json",
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }

    const { data } = await axios.get(`/api/?page=${page}`, config)

    // const data = {
    //     "posts": [
    //         {
    //             "id": v1(),
    //             "user_id": 3,
    //             "created_at": "2021-08-13T17:33:50.000000Z",
    //             "updated_at": "2021-08-20T08:23:22.000000Z",
    //             "caption": "hello",
    //             "likes": 1,
    //             "comments_number": 5,
    //             "state": true,
    //             "images": [
    //                 {
    //                     "id": 5,
    //                     "post_id": 5,
    //                     "path": "posts/215811899_118592657169320_8825991658143610455_n.jpg",
    //                     "created_at": "2021-08-13T17:33:50.000000Z",
    //                     "updated_at": "2021-08-13T17:33:50.000000Z"
    //                 }
    //             ],
    //             "comments": [
    //                 {
    //                     "id": 11,
    //                     "post_id": 5,
    //                     "body": "buku",
    //                     "created_at": "2021-08-20T08:23:22.000000Z",
    //                     "image": "profile/z2668372807785_322f492308569d564ae15bd140413120.jpg",
    //                     "name": "kien",
    //                     "username": "kien1"
    //                 },
    //                 {
    //                     "id": 10,
    //                     "post_id": 5,
    //                     "body": "ghet",
    //                     "created_at": "2021-08-20T08:22:31.000000Z",
    //                     "image": "profile/z2668372807785_322f492308569d564ae15bd140413120.jpg",
    //                     "name": "kien",
    //                     "username": "kien1"
    //                 }
    //             ],
    //             "user": {
    //                 "id": 3,
    //                 "name": "kien",
    //                 "username": "kienx",
    //                 "image": "/img/default.png"
    //             }
    //         },
    //         {
    //             "id":  v1(),
    //             "user_id": 3,
    //             "created_at": "2021-08-13T17:19:59.000000Z",
    //             "updated_at": "2021-08-20T04:19:31.000000Z",
    //             "caption": "hello",
    //             "likes": 1,
    //             "comments_number": 0,
    //             "state": true,
    //             "images": [
    //                 {
    //                     "id": 4,
    //                     "post_id": 4,
    //                     "path": "posts/215811899_118592657169320_8825991658143610455_n.jpg",
    //                     "created_at": "2021-08-13T17:19:59.000000Z",
    //                     "updated_at": "2021-08-13T17:19:59.000000Z"
    //                 }
    //             ],
    //             "comments": [
    //             ],
    //             "user": {
    //                 "id": 3,
    //                 "name": "kien",
    //                 "username": "kienx",
    //                 "image": "/img/default.png"
    //             }
    //         }
    //     ],
    //     "user": {
    //         "id": 2,
    //         "name": "kien",
    //         "email": "kien@mail.com",
    //         "username": "kien1",
    //         "email_verified_at": null,
    //         "created_at": "2021-08-11T14:44:43.000000Z",
    //         "updated_at": "2021-08-11T14:44:43.000000Z",
    //         "image": "profile/z2668372807785_322f492308569d564ae15bd140413120.jpg"
    //     },
    //     "sugg_users": [
    //     ]
    // }
    
    dispatch({
        type: POST_INDEX_SUCCESS,
        payload: data
    })
}

export const like = (post) => async (dispatch, getState) => {

    const { userLogin: { userInfo } } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }
    const { data } = await axios.post(
        `/api/like/${post}`,
        {},
        config
    )
    // console.log(data)
    dispatch({
        type: POST_LIKE_SUCCESS,
        payload: data
    })

}

export const likeIndex = (post, number) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }
    const { data } = await axios.get(
        `/api/like/${post}?number=${number}`,
        config
    )

    // console.log(data)
    dispatch({
        type: POST_LIKE_INDEX,
        payload: data
    })
}
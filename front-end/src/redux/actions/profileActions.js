import axios from "axios";

import {
    PROFILE_INDEX_FAIL,
    PROFILE_INDEX_REQUEST,
    PROFILE_INDEX_SUCCESS,

    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,

    PROFILE_EDIT_FAIL,
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,
    PROFILE_SEARCH_REQUEST,
    PROFILE_SEARCH_SUCCESS
} from '../contants/profileContants'

export const index = (username) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_INDEX_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()


        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.get(
            `/api/profile/${username}`, config
        )

        dispatch({
            type: PROFILE_INDEX_SUCCESS,
            payload: data
        })

        // localStorage.setItem('profileInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: PROFILE_INDEX_FAIL,
            payload: error
        })
    }
}


export const edit = (username) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_EDIT_REQUEST })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.get(`
        /api/profile/${username}/edit`, config)

        dispatch({
            type: PROFILE_EDIT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PROFILE_EDIT_FAIL,
            payload: error
        })

    }
}

export const update = (fd) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_UPDATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                // "Content-Type" : "application/json",
                'Content-Type': 'multipart/form-data',
                Authorization: `${userInfo.token_type} ${userInfo.access_token}`
            }
        }
        // console.log(fd.get('image'))

        fd.append('_method', 'PUT')
        const { data } = await axios.post(`/api/profile/${userInfo.username}`, fd, config)

        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error
        })
    }
}

export const search = (q) => async (dispatch, getState) => {
    try {
        dispatch({ type: PROFILE_SEARCH_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                // "Content-Type" : "application/json",
                'Content-Type': 'multipart/form-data',
                Authorization: `${userInfo.token_type} ${userInfo.access_token}`
            }
        }

        const { data } = await axios.get(
            `/api/search?q=${q}`, config
        )

        // console.log(data)

        dispatch({
            type: PROFILE_SEARCH_SUCCESS,
            payload: data
        })
    }
    catch (error) {

    }
}
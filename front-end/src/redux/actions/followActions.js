import axios from "axios";

import {
    FOLLOWERS_REQUEST,
    FOLLOWERS_SUCCESS,
    FOLLOW_RESQUEST,
    FOLLOW_SUCCESS
} from '../contants/followContants';

export const follow = (profile) => async (dispatch, getState) => {
    dispatch({ type: FOLLOW_RESQUEST })

    const { userLogin: { userInfo } } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }
    const { data } = axios.post(`/api/follow/${profile}`, {}, config)

    dispatch({ type: FOLLOW_SUCCESS, payload: data })
}

export const followers = (user) => async (dispatch, getState) => {

    dispatch({type: FOLLOWERS_REQUEST})

    const { userLogin: { userInfo } } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }

    const { data } = await axios.get(`/api/follow/${user}`, config)

    dispatch({
        type: FOLLOWERS_SUCCESS,
        payload: data.followers
    })
}

export const following = (user) => async (dispatch, getState) => {

    dispatch({type: FOLLOWERS_REQUEST})

    const { userLogin: { userInfo } } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `${userInfo.token_type} ${userInfo.access_token}`
        }
    }

    const { data } = await axios.get(`/api/following/${user}`, config)

    dispatch({
        type: FOLLOWERS_SUCCESS,
        payload: data.following
    })
}
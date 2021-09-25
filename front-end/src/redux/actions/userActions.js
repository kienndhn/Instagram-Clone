import axios from "axios";

import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from '../contants/userContants.js'

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(
            '/api/login',
            { email, password },
            config
        )

        // console.log(data)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response.data.errors
        })
    }
}

export const register = (name, email, username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/register',
            { name, username, email, password },
            config
        )
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        // console.log(error.response)
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response.data.errors
        })
    }
}

export const logout = () => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `${userInfo.token_type} ${userInfo.access_token}`,
        }
    }
    dispatch({ type: USER_LOGOUT })
    localStorage.removeItem('userInfo')

    const { data } = await axios.post('/api/logout', {}, config)
    document.location.href = '/login'
}
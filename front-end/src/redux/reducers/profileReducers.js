// import { data } from 'jquery'
import {
    PROFILE_INDEX_FAIL,
    PROFILE_INDEX_REQUEST,
    PROFILE_INDEX_SUCCESS,

    PROFILE_EDIT_FAIL,
    PROFILE_EDIT_REQUEST,
    PROFILE_EDIT_SUCCESS,

    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_SEARCH_REQUEST,
    PROFILE_SEARCH_SUCCESS,
    PROFILE_SEARCH_RESET,

} from '../contants/profileContants'

export const profileIndexReducer = (state = {}, action) => {

    switch (action.type) {
        case PROFILE_INDEX_REQUEST:
            return {
                loading: true
            }
        case PROFILE_INDEX_SUCCESS:
            return {
                loading: false,
                profileInfo: action.payload
            }
        case PROFILE_INDEX_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const profileEditReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_EDIT_REQUEST:
            return {
                loadind: true
            }
        case PROFILE_EDIT_SUCCESS:
            return {
                loading: false,
                profileInfo: action.payload
            }
        case PROFILE_EDIT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const profileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return {
                loading: true
            }
        case PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PROFILE_UPDATE_FAIL:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const profileSearchReducer = (state = { open: false }, action) => {
    switch (action.type) {
        case PROFILE_SEARCH_REQUEST:
            return {
                loading: true,
                open: true
            }
        case PROFILE_SEARCH_SUCCESS:
            return {
                loading: false,
                open: true,
                result: action.payload.profiles,
            }
        case PROFILE_SEARCH_RESET:
            return {
                open: false,
                loading: false
            }
        default:
            return state
    }
}
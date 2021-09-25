import {
    POST_STORE_FAIL,
    POST_STORE_REQUEST,
    POST_STORE_SUCCESS,
    POST_STORE_RESET,
    POST_SHOW_REQUEST,
    POST_SHOW_FAIL,
    POST_SHOW_SUCCESS,
    POST_LIKE_SUCCESS,
    POST_LIKE_RESET,
    POST_INDEX_REQUEST,
    POST_INDEX_SUCCESS,
    POST_LIKE_INDEX,
    POST_LIKE_INDEX_RESET,
} from '../contants/postContants'

export const postStoreReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_STORE_REQUEST:
            return {
                loading: true
            }
        case POST_STORE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case POST_STORE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case POST_STORE_RESET:
            return {}
        default:
            return state

    }
}

export const postShowReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_SHOW_REQUEST:
            return {
                loading: true,
            }
        case POST_SHOW_SUCCESS:
            return {
                loading: false,
                postInfo: action.payload
            }
        case POST_SHOW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const postLikeReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case POST_LIKE_SUCCESS:
            return {
                likeState: action.payload,
                success: true
            }
        case POST_LIKE_RESET:
            return {}
        case POST_LIKE_INDEX:
            return {
                likes: state.likes ? [...state.likes, ...action.payload.likes] : action.payload.likes
            }
        case POST_LIKE_INDEX_RESET:
            return {}
        default:
            return state
    }
}

export const postIndexReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_INDEX_REQUEST:
            return {
                loading: state.posts ? false : true,
                posts: state.posts,
                user: state.user,
                suggest: state.suggest

            }
        case POST_INDEX_SUCCESS:
            return {
                loading: false,
                posts: state.posts ? [...state.posts, ...action.payload.posts] : action.payload.posts,
                user: action.payload.user,
                suggest: action.payload.sugg_users
            }
        default:
            return state
    }
}

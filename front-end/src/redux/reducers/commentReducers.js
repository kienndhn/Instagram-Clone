import {
    COMMENT_INDEX_REQUEST,
    COMMENT_INDEX_SUCCESS,
    COMMENT_STORE_REQUEST,
    COMMENT_STORE_RESET,
    COMMENT_STORE_SUCCESS
} from "../contants/commentContants";

export const commentIndexReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_STORE_SUCCESS:
            return {
                success: true,
                comments: state.comments ? [...action.payload, ...state.comments] : action.payload
            }
        case COMMENT_INDEX_SUCCESS:
            return {
                comments: state.comments ? [...state.comments, ...action.payload] : action.payload
            }
        default:
            return state
    }
}

export const commentStoreReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_STORE_SUCCESS:
            return {
                success: true,
                comments: state.comments ? [...action.payload, ...state.comments] : action.payload
            }
        case COMMENT_STORE_RESET:
            return {}
        default:
            return state
    }
}
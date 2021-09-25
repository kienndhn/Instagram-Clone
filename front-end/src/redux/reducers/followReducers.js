import { FOLLOWERS_REQUEST, FOLLOWERS_SUCCESS } from "../contants/followContants";

export const followersListReducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOWERS_REQUEST:
            return { loading: true }
        case FOLLOWERS_SUCCESS:
            console.log(action)
            return {
                loading: false,
                result: action.payload
            }
        default:
            return state
    }
}
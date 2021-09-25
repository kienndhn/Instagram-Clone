import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
    userRegisterReducer,

} from './reducers/userReducers'

import {
    profileEditReducer,
    profileIndexReducer,
    profileSearchReducer,
    profileUpdateReducer,

} from './reducers/profileReducers'
import {
    postIndexReducer,
    postLikeReducer,
    postShowReducer,
    postStoreReducer,

} from './reducers/postReducers'
import {
    commentIndexReducer, commentStoreReducer
} from './reducers/commentReducers'
import { dropReducer, modalReducer } from './reducers/helpReducer'
import { followersListReducer } from './reducers/followReducers'



const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,

    profileIndex: profileIndexReducer,
    profileUpdate: profileUpdateReducer,
    profileEdit: profileEditReducer,
    profileSearch: profileSearchReducer,

    postStore: postStoreReducer,
    postShow: postShowReducer,
    postLike: postLikeReducer,
    postIndex: postIndexReducer,

    commentIndex: commentIndexReducer,
    commentStore: commentStoreReducer,

    showModal: modalReducer,
    showDrop: dropReducer,

    followersList: followersListReducer
})

const middleware = [thunk]

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

// const profileInfoprofileInfoFromStorage = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('profileInfo'))
//     : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage, error: {} },
    showDrop: {show: false}
    // profileIndex: { profileInfo: profileInfoprofileInfoFromStorage }
}

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store

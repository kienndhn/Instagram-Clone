import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from './Avatar'

import { IoPersonCircleOutline, IoSettingsOutline } from 'react-icons/io5'
import { BsPlusCircle } from "react-icons/bs";
import { logout } from '../redux/actions/userActions';

const DropdownProfile = () => {

    const [show, setShow] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const ref = useRef()

    const dispatch = useDispatch()

    const logoutHandler = () => {
        // console.log(userInfo)
        dispatch(logout())

    }

    useOnClickOutside(ref, () => setShow(false))

    return (
        <>
            <div className="d-flex flex-column ml-4 my-auto" ref={ref}>
                <button role="button" className="btn p-0 justify-content-center align-items-center d-flex" style={{ borderRadius: "50%" }} aria-haspopup="true" aria-expanded="false"
                    onClick={(e) => setShow(!show)}
                >
                    {userInfo ?
                        <Avatar src={userInfo.image} w={22} />
                        :
                        <IoPersonCircleOutline style={{ width: "22px", height: "22px" }} />
                    }
                </button>
                {show &&
                    <div key="menu1" className="d-flex flex-shrink-0 custom-drop-bar" style={{ marginLeft: "-180px" }}>
                        <div className="d-flex custom-drop-menu" style={{ width: "230px" }}>
                            <div className="d-flex drop-point" style={{ left: "184px" }}></div>
                            <div className="d-flex flex-column w-100 h-100" style={{ zIndex: "100", background: "white" }}>
                                {
                                    userInfo ?
                                        <>
                                            <a className="dropdown-item d-flex flex-row align-items-center" style={{ padding: "8px 16px" }} href={`/profile/${userInfo.username}`}>
                                                <IoPersonCircleOutline style={{ width: "25px", height: "25px", marginRight: "12px" }} />
                                                <div className="d-flex" style={{ fontWeight: "400" }}>Profile</div>
                                            </a>
                                            <a className="dropdown-item d-flex flex-row align-items-center" style={{ padding: "8px 16px" }} href={`/post/create`} >
                                                <BsPlusCircle style={{ width: "25px", height: "25px", marginRight: "12px" }} />
                                                <div className="d-flex" style={{ fontWeight: "400" }}>New Post</div>
                                            </a>
                                            <a className="dropdown-item d-flex flex-row align-items-center" style={{ padding: "8px 16px" }} href={`/profile/${userInfo.username}/edit`}>
                                                <IoSettingsOutline style={{ width: "25px", height: "25px", marginRight: "12px" }} />
                                                <div className="d-flex" style={{ fontWeight: "400" }}>Edit</div>
                                            </a>
                                            <a className="dropdown-item d-flex flex-row align-items-center border-top" style={{ padding: "8px 16px" }} onClick={logoutHandler}>
                                                {/* <IoSettingsOutline style={{ width: "25px", height: "25px", marginRight: "12px" }} /> */}
                                                <div className="d-flex" style={{ fontWeight: "400" }}>Logout</div>
                                            </a>
                                        </>
                                        :
                                        <>
                                            <a className="dropdown-item d-flex flex-row align-items-center border-top" style={{ padding: "8px 16px" }} href={`/login`}>
                                                {/* <IoSettingsOutline style={{ width: "25px", height: "25px", marginRight: "12px" }} /> */}
                                                <div className="d-flex" style={{ fontWeight: "400" }}>Login</div>
                                            </a>
                                            <a className="dropdown-item d-flex flex-row align-items-center border-top" style={{ padding: "8px 16px" }} href={`/register`}>
                                            {/* <IoSettingsOutline style={{ width: "25px", height: "25px", marginRight: "12px" }} /> */}
                                            <div className="d-flex" style={{ fontWeight: "400" }}>Register</div>
                                        </a>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default DropdownProfile
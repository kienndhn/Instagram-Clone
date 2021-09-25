import React, { useEffect, useRef, useState } from 'react'
// import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const DropdownLike = ({ }) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const ref = useRef()

    useOnClickOutside(ref, () => setShow(false))

    return (
        <>
            <div className="d-flex flex-column ml-4 my-auto" ref={ref}>
                <div role="button" className="btn p-0 justify-content-center align-items-center d-flex" style={{ borderRadius: "50%" }} aria-haspopup="true" aria-expanded="false"
                    onClick={(e) => setShow(!show)}
                >
                    {!show ? <FaRegHeart style={{width:"22px", height:"22px"}} /> : <FaHeart style={{width:"22px", height:"22px"}} color="black" />}
                </div>
                {show &&
                    <div key="menu1" className="d-flex flex-shrink-0 custom-drop-bar" style={{ marginLeft: "-180px"}}>
                        <div className="d-flex custom-drop-menu" style={{  width: "230px" }}>
                            <div className="d-flex drop-point" style={{ left: "184px"}}></div>
                            <div className="d-flex flex-column w-100 h-100" style={{ zIndex: "100", background: "white" }}>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>}
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
        [ref, handler]
    );
}

export default DropdownLike
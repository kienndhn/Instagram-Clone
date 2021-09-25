import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropdownMenu from './DropdownMenu'

const Dropdown = ({ button, menu }) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)

    const ref = useRef()

    useOnClickOutside(ref, ()=>setShow(false))

    return (
        <>
            <div className="d-flex flex-column ml-4" ref={ref}>
                <button role="button" className="btn p-0 justify-content-center align-items-center d-flex" style={{ borderRadius: "50%" }} aria-haspopup="true" aria-expanded="false"
                    onClick={(e) => setShow(!show)}
                >
                    {button}
                </button>
                {show && menu}
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

export default Dropdown
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'



const Modal = ({  }) => {

    const showModal = useSelector(state => state.showModal)
    const { show, children } = showModal

    useEffect(() => {
        if(show){
            document.body.style.overflowY = "hidden"
        }
        else {
            document.body.style.overflowY = "scroll"
        }
    }, [show, children])

    return (
        <>{
            show &&
            <>
                <div style={{
                    position: "fixed", /* Positioning and size */
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100vh",
                    tabIndex: "-1",
                    zIndex: "100",
                    backgroundColor: "rgba(0, 0, 0, 0.65)",
                    display: "block",
                }}>

                </div >
                <div
                    className="modal"
                    tabIndex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                    style={{ display: "block"}}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content" >
                            <section style={{zIndex:'100'}}>
                                {children}
                            </section>
                            {/*  */}

                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}

export default Modal
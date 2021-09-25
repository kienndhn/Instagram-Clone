import { faHeart, faHome, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { search } from '../redux/actions/profileActions';
import { PROFILE_SEARCH_RESET } from '../redux/contants/profileContants';
import Avatar from './Avatar';

import NavIcon from './NavIcon';

const Header = () => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const showDrop = useSelector(state => state.showDrop)

    const [q, setq] = useState('')

    const dispatch = useDispatch()

    const inputHandler = useCallback(
        (e) => {
            setq(e.target.value)
            // console.log(q)
        }, [q]
    )

    useEffect(() => {
        if (q.length > 0) {
            dispatch(search(q))
        }
        else {
            console.log(q)
            dispatch({ type: PROFILE_SEARCH_RESET })
        }
    }, [q])

    console.log("header rerender")

    return (
        <>

            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm custom-nav">
                <div className="container justify-content-between">
                    <a className="navbar-brand" href="/">
                        <img src={"/cleanlogo.png"} />
                    </a>


                    <div className="d-none d-md-flex flex-column  align-items-center  custom-nav-search" >
                        <div className="d-flex flex-row border  align-items-center">
                            <FontAwesomeIcon icon={faSearch} color="rgba(0, 0, 0, 0.5)" className="search-icon" />
                            <input style={{ marginLeft: "10px" }} type="text" className="input-group-append border-0" placeholder="Search"
                                onChange={(e) => inputHandler(e)}
                                value={q}
                            />
                        </div>

                        {q.length > 0 && <SearchBox />}
                    </div>

                    <NavIcon />


                </div>

            </nav>
        </>
    )
}


const SearchBox = () => {

    const profileSearch = useSelector(state => state.profileSearch)
    const { result, open } = profileSearch

    console.log(result)

    return (
        <div className="d-flex custom-drop-bar" style={{ marginLeft: "-375px", top: "12px" }}>
            <div className="d-flex custom-drop-menu" style={{ width: "375px" }}>
                <div className="drop-point d-flex" style={{ left: "187px" }}></div>
                <div className="flex-column d-flex w-100" style={{ background: "white", zIndex: "100", height: "362px", paddingTop: "12px", overflowY: "auto" }}>
                    {result &&
                        (
                            result.length > 0 ? result.map((u) => (
                                <a href={`/profile/${u.username}`} className="text-dark text-decoration-none list-user" >
                                    <div key={u.id} className="d-flex flex-row" style={{ padding: "8px 16px" }}>
                                        <div style={{ marginRight: "12px" }}><Avatar src={u.profile.image} w={44} /> </div>
                                        <div className="d-flex flex-column">
                                            <strong >{u.username}</strong>
                                            <span className="text-muted">{u.name}</span>
                                        </div>
                                    </div>
                                </a>
                                // <div>user</div>
                            ))
                                : <div className="d-flex m-auto">Not Found</div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}
export default Header
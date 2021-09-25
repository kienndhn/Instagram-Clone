import React from 'react'
import { HiHome, HiOutlineHome } from 'react-icons/hi'

import { useHistory } from 'react-router-dom'
import DropdownLike from './DropdownLike'
import DropdownProfile from './DropdownProfile'

const NavIcon = ({ history }) => {

    return (
        <div className="d-flex flex-row align-content-center">
            <HomeIcon />
            <DropdownLike />
            <DropdownProfile />
        </div>

    )

}

const HomeIcon = () => {
    const history = useHistory()

    const path = history.location.pathname


    return (
        <div role="button" className="btn p-0 justify-content-center align-items-center d-flex" style={{ borderRadius: "50%" }} aria-haspopup="true" aria-expanded="false"
        >
            <a href="/" className="text-dark">
                {path !== '/' ?
                    <HiOutlineHome style={{ width: "24px", height: "24px" }} />
                    :
                    <HiHome style={{ width: "24px", height: "24px" }} />
                }
            </a>
        </div>
    )
}

export default NavIcon
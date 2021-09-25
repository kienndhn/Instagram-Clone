import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardDots = () => {
    return(
        <>
        < button type="button" className="btn btn-link text-muted">
            <FontAwesomeIcon icon={faEllipsisH} />
        </button>
        </>
    )
}

export default CardDots
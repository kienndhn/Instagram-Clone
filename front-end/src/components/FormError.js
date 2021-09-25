import { useSelector, useDispatch } from 'react-redux'

const FormError = (props) => {

    // console.log(props)
    if (props.isHidden) return null

    return (
        <span className="text-danger">
            <small><strong>{props.errorMessage}</strong></small>
        </span>
    )
}

export default FormError



import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { useMediaQuery } from "react-responsive"
import { Redirect } from "react-router-dom"
import FormError from "../../components/FormError"
import { register } from "../../redux/actions/userActions"
import { USER_REGISTER_INVALID } from "../../redux/contants/userContants"


const Register = ({ history }) => {

    // const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // const [error, seterror] = useState('')
    // const [validateError, setValidateError] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo: userAlready } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()

        validateInput('name', name)
        validateInput('email', email)
        validateInput('username', username)
        validateInput('password', password)
        validateInput('confirmPassword', confirmPassword)

        if (Object.keys(error).length === 0) {
            dispatch(register(name, email, username, password))
        }
    }

    const validateInput = (inputType, value) => {

        const NAME_PATTERN = /^\p{L}\p{L}+( \p{L}\p{L}+)*$/u
        const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const USERNAME_PATTERN = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/


        switch (inputType) {
            case "name":
                if (value === "") {
                    error.name = "Không được bỏ trống"
                }
                else if (!NAME_PATTERN.test(value)) {
                    error.name = "Tên người dùng không bao gồm chữ số và kí tự đặc biệt"
                }
                else {
                    delete error.name
                }
                break
            case "email":
                if (value === "") {
                    error.email = "Không được bỏ trống"
                }
                else if (!EMAIL_PATTERN.test(String(value).toLowerCase())) {
                    error.email = "Email không đúng định dạng"
                }
                else {
                    delete error.email
                }
                break
            case "username":
                if (value === "") {
                    error.username = "Không được bỏ trống"
                }
                else if (!USERNAME_PATTERN.test(value)) {
                    error.username = 'Tên người dùng không đúng định dạng'
                }
                else {
                    delete error.username
                }
                break
            case "password":
                if (value === "") {
                    error.password = "Không được bỏ trống"
                }
                else if (value.length < 8) {
                    error.password = 'Mật khẩu phải có tối thiểu 8 ký tự'
                }
                else {
                    delete error.password
                }
                break
            case "confirmPassword":
                if (confirmPassword === "") {
                    error.confirmPassword = "Không được bỏ trống"
                }
                else if (confirmPassword !== password) {
                    error.confirmPassword = 'Mật khẩu xác nhận đã nhập không khớp'
                }
                else {
                    delete error.confirmPassword
                }
        }
        dispatch({ type: USER_REGISTER_INVALID, payload: { error } })
        console.log(error)
    }

    useEffect(() => {
        if (userInfo || userAlready) {
            history.push(`/profile/${userInfo.username}`)
            // <Redirect to='/' />
        }
        if (error) {
            console.log(error)
        }

    }, [history, userInfo, error, userAlready])

    return (
        // <main className={isBigScreen ? "py-5" : "py-4"}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register</div>

                            <div className="card-body">
                                <form className="form-group" onSubmit={(e) => submitHandler(e)} noValidate>

                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                        <div className="col-md-6">
                                            <input id="name"
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                // autoFocus={true}
                                                onBlur={(e) => validateInput('name', e.target.value)}
                                            />

                                            <FormError
                                                isHidden={error.name ? false : true}
                                                errorMessage={error.name}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>

                                        <div className="col-md-6">
                                            <input id="email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={email}
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                onBlur={(e) => validateInput("email", e.target.value)}
                                            />

                                            <FormError
                                                isHidden={error.email ? false : true}
                                                errorMessage={error.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="username" className="col-md-4 col-form-label text-md-right">Username</label>

                                        <div className="col-md-6">
                                            <input id="username"
                                                type="username"
                                                className="form-control"
                                                name="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                onBlur={(e) => validateInput("username", e.target.value)}
                                                required
                                            />

                                            <FormError
                                                isHidden={error.username ? false : true}
                                                errorMessage={error.username}
                                            />

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input id="password"
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                // style={{background: "#DB4437"}}
                                                required
                                                onBlur={(e) => validateInput("password", e.target.value)}
                                            />
                                            <FormError
                                                isHidden={error.password ? false : true}
                                                errorMessage={error.password}
                                            />

                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm"
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(e.target.value)
                                                }
                                                onBlur={(e) => validateInput("confirmPassword", e.target.value)}
                                                required
                                            />
                                            <FormError
                                                isHidden={error.confirmPassword ? false : true}
                                                errorMessage={error.confirmPassword}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary"
                                            // disabled={error!=={} ? true : false}
                                            // onClick={submitHandler}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </main>
    )
}

export default Register
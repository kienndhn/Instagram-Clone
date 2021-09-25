import React from "react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useMediaQuery } from "react-responsive";
import FormError from "../../components/FormError.js";
import { login } from '../../redux/actions/userActions.js'
import { USER_LOGIN_INVALID } from "../../redux/contants/userContants.js";

const Login = ({ history }) => {

    // const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(`/profile/${userInfo.username}`)
        }
        if (error) {
            console.log(error)
        }
    }, [dispatch, userInfo])


    const validateInput = (inputType, value) => {

        // const NAME_PATTERN = /^\p{L}\p{L}+( \p{L}\p{L}+)*$/u
        const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // const USERNAME_PATTERN = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/


        switch (inputType) {
            // case "name":
            //     if (value === "") {
            //         error.name = "Không được bỏ trống"
            //     }
            //     else if (!NAME_PATTERN.test(value)) {
            //         error.name = "Tên người dùng không bao gồm chữ số và kí tự đặc biệt"
            //     }
            //     else {
            //         delete error.name
            //     }
            //     break
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
            // case "username":
            //     if (value === "") {
            //         error.username = "Không được bỏ trống"
            //     }
            //     else if (!USERNAME_PATTERN.test(value)) {
            //         error.username = 'Tên người dùng không đúng định dạng'
            //     }
            //     else {
            //         delete error.username
            //     }
            //     break
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
            // case "confirmPassword":
            //     if (confirmPassword === "") {
            //         error.confirmPassword = "Không được bỏ trống"
            //     }
            //     else if (confirmPassword !== password) {
            //         error.confirmPassword = 'Mật khẩu xác nhận đã nhập không khớp'
            //     }
            //     else {
            //         delete error.confirmPassword
            //     }
        }
        dispatch({ type: USER_LOGIN_INVALID, payload: { error } })
    }


    const submitHandler = (e) => {
        e.preventDefault()

        validateInput("email", email)
        validateInput("password", password)

        if (Object.keys(error).length === 0) {
            dispatch(login(email, password))
        }
    }
    return (
        // <main className={isBigScreen?"py-5":"py-4"}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <div className="form-group">
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>

                                        <div className="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                required
                                                autoComplete="email"
                                                autoFocus
                                                value={email}
                                                onChange={(e) => {setEmail(e.target.value) }}
                                            />
                                            {error&&<FormError
                                                isHidden={error.email ? false : true}
                                                errorMessage={error.email}
                                            />}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                name="password" required
                                                autoComplete="current-password"
                                                value={password}
                                                onChange={(e) => {setPassword(e.target.value) }}
                                            />
                                            {error&&<FormError
                                                isHidden={error.password ? false : true}
                                                errorMessage={error.password}
                                            />}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit"
                                                className="btn btn-primary"
                                                onClick={submitHandler}>
                                                Login
                                            </button>


                                            <a className="btn btn-link" href="#">
                                                Forgot Your Password
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </main>
    )
}

export default Login
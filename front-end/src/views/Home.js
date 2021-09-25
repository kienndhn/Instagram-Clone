import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Home = ({history}) => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            console.log(userInfo)
        }
    }, [dispatch, history, userInfo])
    return (
        <div>Hello</div>
    )
}
export default Home
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useMediaQuery } from 'react-responsive'
import { Redirect } from 'react-router-dom'
import { edit, index, update } from '../../redux/actions/profileActions'
import ProfileIndex from './Index'

const ProfileEdit = ({ history, match }) => {

    // const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' })

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profileEdit = useSelector(state => state.profileEdit)
    const { loading, profileInfo, error } = profileEdit

    const profileUpdate = useSelector(state => state.profileUpdate)
    const { success } = profileUpdate

    const dispatch = useDispatch()

    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState([])
    const [path, setPath] = useState('')

    // const [formData, setFormdata] = useState(new FormData())

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('website', website)
        formData.append('bio', bio)
        formData.append('description', description)
        if (image.length !== 0) {
            // console.log(image.length !== 0)
            formData.append('image', image)
        }
        dispatch(update(formData))
    }

    const inputImageHandler = useCallback(
        (e) => {
            setImage(e.target.files[0])
        },
        [image],
    )

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (userInfo.username !== match.params.username) {
            history.push(`/profile/${match.params.username}`)
        }

        if (!profileInfo) {
            dispatch(edit(match.params.username))
        }
        else {
            setWebsite(profileInfo.profile.website ? profileInfo.profile.website : '')
            setBio(profileInfo.profile.bio ? profileInfo.profile.bio : '')
            setDescription(profileInfo.profile.description ? profileInfo.profile.description : '')
            // setPath(profileInfo.profile.image)
            // console.log(profileInfo)
        }

        if (success) {
            history.push(`/profile/${match.params.username}`)
        }
    }, [dispatch, success, profileInfo])

    return (
        // <div className={isBigScreen ? "py-5" : "py-4"}>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Edit Profile</div>

                        <div className="card-body">
                            <form
                                encType="multipart/form-data"
                                onSubmit={(e) => { submitHandler(e) }}
                            // encType="multipart/form-data"
                            >
                                <div className="form-group row ">
                                    <label htmlFor="website" className="col-md-4 col-form-label text-md-right"><strong>Website</strong></label>

                                    <div className="col-md-6">
                                        <input
                                            id="website"
                                            type="text"
                                            className="form-control"
                                            name="website"
                                            onChange={(e) => { setWebsite(e.target.value) }}
                                            value={website}>
                                        </input>
                                    </div>
                                </div>

                                <div className="form-group row ">
                                    <label htmlFor="bio" className="col-md-4 col-form-label text-md-right"><strong>Bio</strong></label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            className="form-control"
                                            onChange={(e) => { setBio(e.target.value) }}
                                            value={bio}>
                                        </input>
                                    </div>
                                </div>

                                <div className="form-group row ">
                                    <label htmlFor="description" className="col-md-4 col-form-label text-md-right"><strong>Description</strong></label>
                                    <div className="col-md-6">
                                        <textarea
                                            name="description"
                                            id="description"
                                            className="form-control"
                                            cols="30" rows="10"
                                            onChange={(e) => { setDescription(e.target.value) }}
                                            value={description}>
                                        </textarea>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="image" className="col-md-4 col-form-label text-md-right"><strong>Change Profile Photo</strong></label>
                                    <div className="col-md-6 ">
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="image"
                                                onChange={(e) => inputImageHandler(e)}
                                                // onChange={(e)=>setImage(e.target.files[0])}
                                                name="image">
                                            </input>
                                            <label className="custom-file-label" htmlFor="image">{"Upload Photo..."}</label>
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    )
}

export default ProfileEdit
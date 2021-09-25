import React, { useCallback, useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery'
import { useDispatch, useSelector } from 'react-redux'
// import { useMediaQuery } from 'react-responsive'
import { store } from '../../redux/actions/postActions'
import { POST_STORE_RESET } from '../../redux/contants/postContants'


const PostCreate = ({ history }) => {

    // const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const postStore = useSelector(state => state.postStore)
    const { loading, success, error } = postStore


    const [caption, setCaption] = useState('')
    const [image, setImage] = useState([])
    const [preview, setPreview] = useState([])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (success) {
            dispatch({ type: POST_STORE_RESET })
            history.push(`/profile/${userInfo.username}`)
        }

    }, [dispatch, userInfo, success])

    const inputImageHandler = useCallback(
        (e) => {


            // reader.onloadend = () => {
            //     setUrl(reader.result)
            // }

            Array.from(e.target.files).forEach(
                img => {
                    setImage(image => [...image, ...[img]])
                    setPreview(preview => [...preview, ...[{
                        original: URL.createObjectURL(img),
                        originalClass: "image-preview"
                    }]])
                }
            )

            // console.log(url)
        },
        [image],
    )

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('caption', caption)
        if (image.length !== 0) {
            image.forEach((img) => {
                formData.append('image[]', img)
            })
        }

        dispatch(store(formData))
    }

    return (

        <div className="d-flex flex-row justify-content-center">
            <div className="d-flex flex-column col-md-8 p-0">
                <div className="card">
                    <div className="card-header">Edit Profile</div>

                    <div className="card-body">
                        <form
                            encType="multipart/form-data"
                            onSubmit={(e) => { submitHandler(e) }}
                        >

                            <div className="form-group d-flex flex-row row">
                                <label htmlFor="description" className="col-md-4 col-form-label text-md-right"><strong>Caption</strong></label>
                                <div className="col-md-6">
                                    <textarea
                                        name="caption"
                                        id="caption"
                                        className="form-control"
                                        cols="20" rows="2"
                                        onChange={(e) => { setCaption(e.target.value) }}
                                        value={caption}>
                                    </textarea>
                                </div>
                            </div>



                            <div className="form-group d-flex flex-row row">
                                <label htmlFor="image" className="col-md-4 col-form-label text-md-right"><strong>Photo</strong></label>
                                <div className="col-md-6 ">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="image"
                                            onChange={(e) => inputImageHandler(e)}
                                            multiple
                                            name="image"
                                            accept="image/*"
                                        >
                                        </input>
                                        <label className="custom-file-label" htmlFor="image">{"Upload Photo..."}</label>
                                    </div>
                                </div>

                            </div>

                            <div className="form-group flex-row d-flex row">
                                <label className="col-md-4 col-form-label text-md-right"><strong>Preview</strong></label>
                                <div className="col-md-6 " >

                                    <div className="border" style={{ height: "300px", borderRadius: "0.25rem" }}>
                                        {preview.length > 0 &&
                                            <ReactImageGallery
                                                items={preview}
                                                showFullscreenButton={false}
                                                showPlayButton={false}
                                                // disableSwipe={true}
                                                showBullets={false}
                                            >

                                            </ReactImageGallery>
                                        }
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

    )
}

export default PostCreate

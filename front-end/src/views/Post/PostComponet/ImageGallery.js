import React, { useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ images }) => {

    const [image, setImage] = useState([])
    useEffect(() => {
        if (images)
            images.forEach((img) => {
                setImage(image => [...image, ...[{
                    original: `/storage/${img.path}`,
                    originalClass: 'post-gallery',
                    
                }
                ]])
            })

    }, [images])


    return (
        <>
            {
                images &&
                <ReactImageGallery items={image}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    // disableSwipe={true}
                    showBullets={false}
                    startIndex={0} />
            }
        </>
    )
}


export default Gallery
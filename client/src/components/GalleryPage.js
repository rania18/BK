import React from 'react'
import Carousel from 'react-elastic-carousel';

export default function GalleryPage() {
    return (
        <div className="gallery-page">
            <Carousel verticalMode itemsToShow={1} itemPadding={[0, 0]} outerSpacing={0} pagination={false} >
                <img src="/images/gallery/slide1.png" alt="slide" />
                <img src="/images/gallery/slide2.png" alt="slide" />
                <img src="/images/gallery/slide3.png" alt="slide" />
            </Carousel>
        </div>
    )
}

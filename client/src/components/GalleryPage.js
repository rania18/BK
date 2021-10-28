import React from 'react'
import Carousel from 'react-elastic-carousel';

export default function GalleryPage() {
    return (
        <div className="gallery-page">
            <Carousel verticalMode itemsToShow={1} itemPadding={[0, 0]} outerSpacing={0} pagination={false} >
                <img src="/images/gallery/index1.jpg" alt="slide" />
                <img src="/images/gallery/index2.jpg" alt="slide" />
                <img src="/images/gallery/index4.jpg" alt="slide" />
                <img src="/images/gallery/index5.jpg" alt="slide" />
            </Carousel>
        </div>
    )
}

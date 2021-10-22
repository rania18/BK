import React from 'react';
import Carousel from 'react-elastic-carousel';

export default function ProductImagesSlider(props) {
    const { product } = props;
    return (
        <div className="product-slider">
            <Carousel pagination={false}>
                {product.images.map((item, index) => (
                    <div key={index} >
                        <img src={item} alt="Prodcut" className="product-image" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

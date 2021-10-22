import React from 'react'
import ProductBlock from './ProductBlock';

export default function RelatedProducts(props) {
    const { related } = props;
    const displayedProducts = [];

    if (!related || related.length === 0) {
        return ( <span>No related products for this product</span> )
    } else if (related.length > 3) {
        for (let i=0; i < 3; i++) {
            displayedProducts.push(related[i])
        }
    } else {

        return (
            <div className="popular-produts">
                <div className="products-container">
                    {
                        displayedProducts.map(product =>
                            <ProductBlock key={product._id} product={product} />
                    )}
                </div>
            </div>
        )
    }
}

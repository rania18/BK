import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function ProductBlock(props) {
    const { product } = props;
    return (
        <div className="product" key={product._id}>
            <h3><Link to={'/product/' + product._id}>{product.name}</Link></h3>
            <div className="product-price">{product.price} DT</div>
            <Link to={'/product/' + product._id} ><img src={product.image} alt="product" /></Link>
            <div className="infos active">
                <button className="favorite" >
                    <span className="favorite-title">Add to favorites</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="favorite-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                <button className="quick" >
                    <span className="quick-title">Quick view</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="quick-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </button>
            </div>
            <button className="add"  >
                <svg xmlns="http://www.w3.org/2000/svg" className="add-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button>
            <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
    )
}

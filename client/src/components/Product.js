import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import Breadcrumbs from './modules/Breadcrumbs';
import ContactCard from './modules/ContactCard';
import LoadingBox from './modules/LoadingBox';
import ProductImagesSlider from './modules/ProductImagesSlider';
import Rating from './modules/Rating';
import { getProduct } from '../actions/productActions';
import { useParams } from 'react-router';
import ModalCommande from './modules/ModalCommande';
import ScrollableTabsButtonForce from './modules/TabPanel.js';

function Product (props) {

    let { id } = useParams();
    const productId = id;
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [show, setShow] = useState(false);
    const { OneProductIsLoading, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProduct(productId))
    }, [dispatch, productId])

    if (OneProductIsLoading) {

        return ( <LoadingBox></LoadingBox> );

    } else {

        const bdcrumbs = {
            home: {link : "/", text: "home"},
            cat: {link : "/category/" + products?.category , text: products?.category},
            current: {text: products?.name}
        }

        return (
            <div className="product-page">
                <div className="head-page">
                    <img src={products?.image} alt={products?.category} />
                    <Breadcrumbs bdcrumbs={bdcrumbs} />
                </div>
                <div className="product-page-container">
                    <div className="product-page-infos">
                        <div className="heading">
                            <h1 data-title={products?.name}>{products?.name}</h1>
                            <p>{products?.description}</p>
                            <div className="price">{products?.price + ' DT'}</div>
                        </div>
                        <div className="quantity">
                            <label><strong>Quantity</strong></label>
                            <input type="number" id="qty" name="qty" defaultValue="1" onChange={event => setQty(event.target.value)} />
                        </div>
                        <div className="informations">
                            <p><strong>Availability</strong><span>{products?.availability}</span></p>
                            <p><strong>Favorites</strong><span>Remove From Favorites</span></p>
                        </div>
                        <div className="review">
                            <p><strong>Rating</strong></p>
                            <Rating rating={products?.rating} numReviews={products?.numReviews} className="rating-container" />
                        </div>
                    </div>
                    <div className="product-page-images">
                        <ProductImagesSlider products={products} />
                    </div>
                    <button className="add-to-cart" data-title="BUY" onClick={() => setShow(true)} ><i className="fas fa-cart-plus"></i></button>
                </div>
                <div className="related-container">
                    {/* <div className="contacts-container">
                        <ContactCard />
                    </div> */}
                    <div className="tabs-container">
                        <ScrollableTabsButtonForce products={products} />
                    </div>
                </div>
                <ModalCommande products={products} qty={qty} onClose={() => setShow(false)} show={show}/>
            </div>
        )
    }
}

export default Product;
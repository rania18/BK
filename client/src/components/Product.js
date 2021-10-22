import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import Breadcrumbs from './modules/Breadcrumbs';
import ContactCard from './modules/ContactCard';
import ErrorPage from './modules/ErrorPage';
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
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(getProduct(productId))
    }, [dispatch, productId])

    if (loading) {

        return ( <LoadingBox></LoadingBox> );

    } else if (error) {

        return ( <ErrorPage msg={error}></ErrorPage>  );

    } else {

        const bdcrumbs = {
            home: {link : "/", text: "home"},
            cat: {link : "/category/" + product.category , text: product.categorySlug},
            current: {text: product.name}
        }

        return (
            <div className="product-page">
                <div className="head-page">
                    <img src={product.image} alt={product.categorySlug} />
                    <Breadcrumbs bdcrumbs={bdcrumbs} />
                </div>
                <div className="product-page-container">
                    <div className="product-page-infos">
                        <div className="heading">
                            <h1 data-title={product.name}>{product.name}</h1>
                            <p>{product.description}</p>
                            <div className="price">{product.price + ' DT'}</div>
                        </div>
                        <div className="quantity">
                            <label><strong>Quantity</strong></label>
                            <input type="number" id="qty" name="qty" defaultValue="1" onChange={event => setQty(event.target.value)} />
                        </div>
                        <div className="informations">
                            <p><strong>Availability</strong><span>{product.availability}</span></p>
                            <p><strong>Favorites</strong><span>Remove From Favorites</span></p>
                        </div>
                        <div className="review">
                            <p><strong>Rating</strong></p>
                            <Rating rating={product.rating} numReviews={product.numReviews} className="rating-container" />
                        </div>
                    </div>
                    <div className="product-page-images">
                        <ProductImagesSlider product={product} />
                    </div>
                    <button className="add-to-cart" data-title="BUY" onClick={() => setShow(true)} ><i className="fas fa-cart-plus"></i></button>
                </div>
                <div className="related-container">
                    <div className="contacts-container">
                        <ContactCard />
                    </div>
                    <div className="tabs-container">
                        <ScrollableTabsButtonForce product={product} />
                    </div>
                </div>
                <ModalCommande product={product} qty={qty} onClose={() => setShow(false)} show={show}/>
            </div>
        )
    }
}

export default Product;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from './modules/Breadcrumbs'
import LoadingBox from './modules/LoadingBox';
import ErrorPage from './modules/ErrorPage';
import ProductBlock from './modules/ProductBlock';
import { DetailsShop } from '../actions/shopActions';
import Carousel from 'react-elastic-carousel';

export default function Shop() {

    const dispatch = useDispatch();
    const shopDetails = useSelector((state) => state.shopDetails);
    const { loading, error, details } = shopDetails;

    useEffect(() => {
        dispatch(DetailsShop())
    }, [dispatch])
    
    if (loading) {

        return ( <LoadingBox></LoadingBox> );
    
    } else if (error) {

        return ( <ErrorPage variant="danger">{error}</ErrorPage> );

    } else {

        const mainCategories = details.categories.filter(main => main.parentId === '0');
        const products = details.products;

        const bdcrumbs = {
            home: {link : "/", text: "home"},
            current: {text: 'Shop'}
        }
        return (
            <div className="product-page">
                <div className="head-page">
                    <img src="/images/shop.png" alt="shop" />
                    <Breadcrumbs bdcrumbs={bdcrumbs} />
                </div>
                <div className="maincategories-container">
                    <h2>Categories</h2>
                    <Carousel itemsToShow={window.innerWidth < 600 ? 2 : 6} pagination={false} >
                    {mainCategories.map(item => (
                        <div key={item._id} className="category-content" >
                            <Link to={'/category/' + item._id}><img src={item.image} alt="Slide" className="category-image" /></Link>
                            <h3><Link to={'/category/' + item._id}>{item.title}</Link></h3>
                        </div>
                    ))}
                    </Carousel>
                </div>
                {
                    products ? (
                        <div className="category-products">
                            <h2>Products</h2>
                            <div className="products-container">
                                {
                                    products.map(product =>
                                        <ProductBlock key={product._id} product={product} />
                                    )
                                }
                            </div>
                        </div>
                    ) : ( '' )
                }
            </div>
        )
    }
}

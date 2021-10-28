import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumbs from './modules/Breadcrumbs'
import LoadingBox from './modules/LoadingBox';
import ErrorPage from './modules/ErrorPage';
import { getCategory } from '../actions/categoryActions';
import { useParams } from 'react-router';
import ProductBlock from './modules/ProductBlock';
import Carousel from 'react-elastic-carousel';

export default function Category() {

    let { id } = useParams();
    const dispatch = useDispatch();
    const { OneCategoryIsLoading, category }  = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategory(id))
    }, [dispatch, id])
    
    if (OneCategoryIsLoading) return ( <LoadingBox></LoadingBox> ) 

     
    const products = [];
    const subCategories = [];

    const bdcrumbs = { home: {link : "/", text: "home"}, current: {text: category?.title} }

    return (
        <div className="product-page">
            <div className="head-page">
                <img src={category?.image} alt={category?.title} />
                <Breadcrumbs bdcrumbs={bdcrumbs} />
            </div>
            <div className="maincategories-container">
                <h2>SubCategories</h2>
                <Carousel itemsToShow={window.innerWidth < 600 ? 2 : 6} pagination={false} >
                {subCategories?.map(item => (
                    <div key={item?._id} className="category-content" >
                        <Link to={'/category/' + item?._id}><img src={item?.image} alt="Slide" className="category-image" /></Link>
                        <h3><Link to={'/category/' + item?._id}>{item?.title}</Link></h3>
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
                                products?.map(product =>
                                    <ProductBlock key={product?._id} product={product} />
                                )
                            }
                        </div>
                    </div>
                ) : ( '' )
            }
        </div>
    )
    
}

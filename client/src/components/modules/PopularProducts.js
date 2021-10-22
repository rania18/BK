import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct } from '../../actions/productActions.js';
import ErrorPage from './ErrorPage.js';
import LoadingModule from './LoadingModule.js';
import MessageBox from './MessageBox.js';
import ProductBlock from './ProductBlock.js';

export default function PopularProducts() {

    const dispatch = useDispatch();
    const productList = useSelector( state => state.productList);
    const {loading, error, products} = productList;

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingModule></LoadingModule> );
    
    } else if (error) {

        return ( <ErrorPage><MessageBox variant="danger">{error}</MessageBox></ErrorPage> );

    } else {
        return (
            <div className="popular-produts">
                <h2>Popular products</h2>
                <p>Check out our latest collections</p>
    
                <div className="products-container">
                    {
                    products.map(product =>
                        <ProductBlock key={product._id} product={product} />
                    )}
                </div>
                <button className="view-all"><Link to="/store">View Store</Link></button>
            </div>
        ) 
    }
}

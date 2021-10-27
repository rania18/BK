import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import LoadingBox from './LoadingBox.js';
import { getCategories } from '../../actions/categoryActions.js';
import { useDispatch, useSelector } from 'react-redux';

function CategoriesSlider () {

    const dispatch = useDispatch();
    const {CategoriesIsLoading, categories} = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    
    if (CategoriesIsLoading) { return ( <LoadingBox></LoadingBox> ); }
    const mainCategories = categories.filter(cat => cat.parentId === '0');

    return (
        <div>
            <div className="categories-slider">
                <Carousel itemsToShow={window.innerWidth < 600 ? 2 : 5} pagination={false} >
                    {mainCategories.map(item => (
                        <div key={item._id} className="category-content" >
                            <Link to={'/category/' + item._id}>
                                <img src={item.headerImage} alt="Slide" className="category-image" />
                            </Link>
                            <h3><Link to={'/category/' + item._id}>{item.title}</Link></h3>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    ) 
}

export default CategoriesSlider;
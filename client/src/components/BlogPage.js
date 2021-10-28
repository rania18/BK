import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../actions/blogActions';
import Breadcrumbs from './modules/Breadcrumbs';
import LoadingBox from './modules/LoadingBox';

export default function BlogPage() {

    const dispatch = useDispatch();
    const { BlogsIsLoading, blogs } = useSelector((state) => state.blog)

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch]);
    
    if (BlogsIsLoading) {
        return (<LoadingBox></LoadingBox>)
    } else {

        const bdcrumbs = {
            home: {link : "/", text: "home"},
            current: {text: "Blog"}
        }

        return (
            <div>
                <div className="product-page">
                    <div className="head-page">
                        <img src="/images/blog/blog-header.jpg" alt="Blog" />
                        <Breadcrumbs bdcrumbs={bdcrumbs} />
                    </div>
                </div>
                <div className="news-container">
                    {
                        blogs?.map(item =>
                            <div className="news-item" >
                                <div className="img-container">
                                    <img src={item?.image} alt={item?.title} />
                                    <strong>{item?.date}</strong>
                                </div>
                                <h3>{item?.news}</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

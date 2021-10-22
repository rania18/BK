import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListBlog } from '../actions/blogActions';
import Breadcrumbs from './modules/Breadcrumbs';
import ErrorPage from './modules/ErrorPage';
import LoadingBox from './modules/LoadingBox';

export default function BlogPage() {

    const dispatch = useDispatch();
    const blogList = useSelector((state) => state.blogList)
    const { loading, error, blog } = blogList;

    useEffect(() => {
        dispatch(ListBlog())
    }, [dispatch]);
    
    if (loading) {
        return (<LoadingBox></LoadingBox>)
    } else if (error) {
        return (<ErrorPage msg={error} />)
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
                        blog.map(item =>
                            <div className="news-item" >
                                <div className="img-container">
                                    <img src={item.image} alt={item.title} />
                                    <strong>{item.date}</strong>
                                </div>
                                <h3>{item.news}</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

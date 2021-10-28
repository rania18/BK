import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogs } from '../../actions/blogActions';
import LoadingBox from './LoadingBox';
import BlogModal from './BlogModal';

function Blog (props) {
    const dispatch = useDispatch();
    const { BlogsIsLoading, blogs } = useSelector( state => state.blog);

    const [item, setItem] = useState(null);
    const [show, setShow] = useState(false);

    const openModal = (event, item) => {
        event.preventDefault();
        setItem(item)
        setShow(true);
    }

    const closeModal = (event) => {
        event.preventDefault();
        setShow(false);
    }


    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);
    
    if (BlogsIsLoading) {

        return ( <LoadingBox></LoadingBox> );
    
    } else {
        return <div className="blog-block">
            <h2>Blog</h2>
            <p>Latest news from the blog</p>

            <div className="blog-container">
                {
                blogs.map(item =>
                        <div className="blog-item" key={item._id}>
                            <img src={item?.image} alt="News" />
                            <div className="blog-infos">
                                <div className="date">{item?.date}</div>
                                <h3> {item?.title} </h3>
                            </div>
                            <button onClick={e => openModal(e, item)} className="view-all"><Link to="#">Read more</Link></button>   
                        </div>
                )}
            </div>
            <button className="view-all"><Link to="/blog">View all posts</Link></button>
            <BlogModal show={show} blog={item} onClose={closeModal} />
        </div>
    }

    
}

export default Blog;
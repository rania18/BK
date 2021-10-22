import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { ListInstagram } from '../../actions/instagramActions';

function Instagram () {

    const dispatch = useDispatch();
    const instagramList = useSelector( state => state.instagramList);
    const {loading, error, instagram} = instagramList;

    useEffect(() => {
        dispatch(ListInstagram());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingBox></LoadingBox> );
    
    } else if (error) {

        return ( <MessageBox variant="danger">{error}</MessageBox> );

    } else {
        return (
            <div className="instagram-block">
                <h2><span>Follow us </span><img src="/images/instagram/iconpng.png" alt="Instagram" /><span>Instagram</span></h2>
                <p><Link to="www.instagram.com" target="_blank">@DnlDecoNumeriqueLazer</Link></p>

                <div className="instagram-images">
                    {
                    instagram.map(item =>
                            <div className="instagram-item" key={item._id}>
                                <img src={item.image} alt="Instagram" />
                            </div>
                    )}
                </div>
            </div>
        ) 
    }
}

export default Instagram;
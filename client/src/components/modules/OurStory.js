import React from 'react';
import { Link } from 'react-router-dom';

function OurStory (props) {
    
        return <div className="our-story">
            <h2>Our Story</h2>
            <p>We believe in creativity as one of the major forces of progress. With this idea, we traveled throughout Italy to find exceptional artisans and bring their unique handcrafted objects to connoisseurs everywhere.</p>
            <button className="view-all"><Link to="/about">Read full story</Link></button>
        </div>
}

export default OurStory;
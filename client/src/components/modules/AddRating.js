import React, { useState } from 'react'

export default function AddRating(props) {
    const { product } = props;
    const [ratingValue, setRatingValue] = useState(0);
    console.log(product._id);

    return (
        <div className="add-rating">
            <div className="add-review-form">
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" required />
                    </div>
                    <div className="form-group">
                        <label>Your Review</label>
                        <textarea rows="8">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>Your Rating</label>
                        <div className="rating-val">
                            <span onClick={() => setRatingValue(1)}><i className={ratingValue >= 1 ? 'fa fa-star' : 'fa fa-star-o'} /></span>
                            <span onClick={() => setRatingValue(2)}><i className={ratingValue >= 2 ? 'fa fa-star' : 'fa fa-star-o'} /></span>
                            <span onClick={() => setRatingValue(3)}><i className={ratingValue >= 3 ? 'fa fa-star' : 'fa fa-star-o'} /></span>
                            <span onClick={() => setRatingValue(4)}><i className={ratingValue >= 4 ? 'fa fa-star' : 'fa fa-star-o'} /></span>
                            <span onClick={() => setRatingValue(5)}><i className={ratingValue >= 5 ? 'fa fa-star' : 'fa fa-star-o'} /></span>
                        </div>
                    </div>
                    <button className="view-all confirm-command">Add Review</button>
                </form>
            </div>
        </div>
    )
}

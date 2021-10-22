import React from 'react'

export default function BlogModal(props) {
    const { blog } = props;

    if (!props.show) {
        return null;
    } else {
        return (
            <div className="modal-container">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header project">
                            <img src={blog.image} alt={blog.title} />
                            <button id="close-modal" onClick={props.onClose} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <h2>{blog.title}</h2>
                        </div>
                        <div className="modal-form">
                            <h4>{blog.date}</h4>
                            <q>{blog.news}</q>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

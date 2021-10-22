import React from 'react'

export default function ProjectModal(props) {
    const { project } = props;

    if (!props.show) {
        return null;
    } else {
        return (
            <div className="modal-container">
                <div className="modal-box">
                    <div className="modal-content">
                        <div className="modal-header project">
                            <img src={project.image} alt={project.title} />
                            <button id="close-modal" onClick={props.onClose} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <h2>{project.title}</h2>
                        </div>
                        <div className="modal-form">
                            {project.desc}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

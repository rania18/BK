import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../actions/projectActions';
import LoadingBox from './LoadingBox';
import ProjectModal from './ProjectModal';

function ArtProjects () {

    const dispatch = useDispatch();
    const {ProjectsIsLoading, projects} = useSelector( state => state.projects);
    const [show, setShow] = useState(false);
    const [project, setProject] = useState(null);

    const openModal = (event, projectId) => {
        event.preventDefault();
        setProject(projectId)
        setShow(true);
    }

    const closeModal = (event) => {
        event.preventDefault();
        setShow(false);
    }

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);
    
    if (ProjectsIsLoading) { return ( <LoadingBox></LoadingBox> ); }
        return <div className="projects-container">
            <div className="art-projects">
                {projects.map(item => (
                        <div key={item._id} className="project" onClick={e => openModal(e, item)} >
                            <img className="project-image" src={item.image} alt="Project" />
                            <Link to="/" className="project-link" >&nbsp;</Link>
                            <div className="project-infos">
                                <h3><Link to="/">{item.title}</Link></h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                ))}
            </div>
            <button className="view-all"><Link to="/projects">View All Projects</Link></button>
            <ProjectModal show={show} project={project} onClose={closeModal} />
        </div>
}

export default ArtProjects;
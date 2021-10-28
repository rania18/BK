import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../actions/projectActions';
import Breadcrumbs from './modules/Breadcrumbs';
import LoadingBox from './modules/LoadingBox';

export default function Projects() {

    const dispatch = useDispatch();
    const { ProjectsIsLoading,  projects } = useSelector((state) => state.projects)

    useEffect( () => {
        dispatch(getProjects())
    }, [dispatch]);
    
    if (ProjectsIsLoading) {
        return <LoadingBox />
    } else {

        const bdcrumbs = {
            home: {link : "/", text: "home"},
            current: {text: "Projects"}
        }

        return (
            <div>
                <div className="product-page">
                    <div className="head-page">
                        <img src="/images/projects/projects-header.jpg" alt="Projects" />
                        <Breadcrumbs bdcrumbs={bdcrumbs} />
                    </div>
                </div>
                <div className='projects-page-container'>
                    {
                        projects.map(item =>
                            <div className='project-item' key={item._id}>
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

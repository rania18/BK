import React from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "./../../assets/slider-style.css";

export default function HomeSlider() {

    /* const dispatch = useDispatch();
    const sliderList = useSelector( state => state.sliderList);
    const {loading, error, sliders} = sliderList;

    useEffect(() => {
        dispatch(ListSlider());
    }, [dispatch]);
    
    if (loading) {

        return ( <LoadingBox></LoadingBox> );
    
    } else if (error) {

        return ( <MessageBox variant="danger">{error}</MessageBox> );

    } else { */
        return (
            <Slider className="slider-wrapper">

            
                <div className="slider-content" >
                    <img src="/images/slider/slide1.jpeg" alt="Slide" className="slide-image" />
                    <div className="inner overlay">
                        {/* <h3>Agencement boutique à usage cosmétique et parfumeries</h3>
                        <ul>
                            <li>Reception de besoin de client</li>
                            <li>Proposition d'un agencement selon les besoins de client sous forme d'une conception 3D reèlle produite par nos architectes</li>
                            <li>La production se fait dans nos ateliers dans les délais précis </li>
                            <li>Livraison, agencement et mise en place avec un bon service aprés vente</li>
                        </ul> */}
                    </div>
                    <section>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/abdelaziz-mohamed-207693b3/' }} target="_blank">
                            <img src="/images/ceo.jpg" alt="CEO" />
                            <span>
                                <strong>Mohamed Abdelaziz</strong>
                                CEO
                            </span>
                        </Link>
                    </section>
                </div>

                <div className="slider-content" >
                    <img src="/images/slider/slide2.jpeg" alt="Slide" className="slide-image" />
                    <div className="inner overlay">
                        <h3>Présentoirs lumineux hauts de gamme</h3>
                        <p>Vous êtes une marque cosmétique et vous voulez bien présenter vos produits avec un aspect professionnel et présentable dans vos boutiques, nous vous proposons différents type de présentoirs produits par diffèrent matériaux comme le bois, plexiglas, PVC, Dibond, selon vos mesures personnalisées.</p>
                    </div>
                    <section>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/abdelaziz-mohamed-207693b3/' }} target="_blank">
                            <img src="/images/ceo.jpg" alt="CEO" />
                            <span>
                                <strong>Mohamed Abdelaziz</strong>
                                CEO
                            </span>
                        </Link>
                    </section>
                </div>

                <div className="slider-content" >
                    <img src="/images/slider/slide3.jpeg" alt="Slide" className="slide-image" />
                    <div className="inner overlay">
                        <h3>Modules et mini-présentoirs en Plexiglas</h3>
                    </div>
                    <section>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/abdelaziz-mohamed-207693b3/' }} target="_blank">
                            <img src="/images/ceo.jpg" alt="CEO" />
                            <span>
                                <strong>Mohamed Abdelaziz</strong>
                                CEO
                            </span>
                        </Link>
                    </section>
                </div>

                <div className="slider-content" >
                    <img src="/images/slider/slide4.jpg" alt="Slide" className="slide-image" />
                    <div className="inner overlay">
                        <h3>Articles de décoration intérieur en bois</h3>
                    </div>
                    <section>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/abdelaziz-mohamed-207693b3/' }} target="_blank">
                            <img src="/images/ceo.jpg" alt="CEO" />
                            <span>
                                <strong>Mohamed Abdelaziz</strong>
                                CEO
                            </span>
                        </Link>
                    </section>
                </div>

                <div className="slider-content" >
                    <img src="/images/slider/slide5.jpg" alt="Slide" className="slide-image" />
                    <div className="inner overlay">
                        <h3>Articles de sécurité contre Covid 19</h3>
                    </div>
                    <section>
                        <Link to={{ pathname: 'https://www.linkedin.com/in/abdelaziz-mohamed-207693b3/' }} target="_blank">
                            <img src="/images/ceo.jpg" alt="CEO" />
                            <span>
                                <strong>Mohamed Abdelaziz</strong>
                                CEO
                            </span>
                        </Link>
                    </section>
                </div>
            
        </Slider>
        ) 
    // }
}

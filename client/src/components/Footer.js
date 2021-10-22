import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(props) {

  const { userInfo } = props;

    return (
        <footer id="footer" className={userInfo && userInfo.isAdmin && 'hideElement'}>
            <div className="visit-showroom">
              <div className="showroom-infos">
                <h4>Visit our showroom</h4>
                <address>Rue Abdallah Farhat, Ouardanin, Monastir, Tunisia</address>
                <p>Mon - Sat: 10 am - 6 pm   &nbsp;  |  &nbsp;   Sun: 12pm - 2 pm</p>
              </div>
              <div className="getdirection">
                <button><Link to="www.google.com" target="_blank">Get Direction</Link></button>
                <div className="phone-container">
                <a href="tel:+21654338085">
                  <svg xmlns="http://www.w3.org/2000/svg" className="phone" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+216 54 338 085</span></a>
                </div>
              </div>
            </div>
            <div className="myfoot">
              <div className="copyright"><span>© 2021 DNL Created by <a href="https://maamoun-grissa.netlify.app/" target="_BLANK" rel="noreferrer" >Maàmoun Grissa</a></span></div>
              <div className="socials">
                <Link to="www.linkedin.com" target="_blank" rel="noreferrer">
                  <img src="/images/socials/linkedin.png" alt="Linkedin" />
                </Link>
                <Link to="www.facebook.com" target="_blank" rel="noreferrer">
                  <img src="/images/socials/facebook.png" alt="Facebook" />
                </Link>
                <Link to="www.instagram.com" target="_blank" rel="noreferrer">
                  <img src="/images/socials/instagram.png" alt="Instagram" />
                </Link>
              </div>
            </div>
          </footer>
    )
}

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom'
import * as actionType from '../constants/actionTypes';
import decode from 'jwt-decode';

// import { signout } from '../actions/userActions';

export default function Header(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
      history.push('/auth');
      setUser(null);
      window.location.reload();
    };

    useEffect(() => {
      const token = user?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken?.exp * 1000 < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
      // eslint-disable-next-line
    }, [location]);

    return (
        <header id="header" className={user?.result?.isAdmin && 'hideElement'}>
            <div id="topbar" className="topbar"> 
              <nav className="topnav">
                <ul>
                  <div className="input-container">
                    <input type="text" className="search-input" />
                  </div>      
                  
                  <li className="search"><a href="/search">
                    <svg xmlns="http://www.w3.org/2000/svg" className="topbar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </a></li>
                  
                  <li><a href="/lang/">
                    <img src="/images/langs/england.png" alt="Flag" />
                    <span>EN</span>
                    </a></li>
  
                  {
                  user?.result?.isAdmin ? (
                      <div>
                        <li className="setting">
                          <Link to="/admin">
                            <svg xmlns="http://www.w3.org/2000/svg" className="admin-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </Link>
                        </li>
                          <li className="setting">
                          <a href="#signout" onClick={logout}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </a>
                        </li>
                      </div>
                      
                    ) :
                    (
                      <li className="account">
                        <Link to="/signin">
                          <svg xmlns="http://www.w3.org/2000/svg" className="account-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </Link>
                      </li>
                    )
                }
                </ul>
              </nav>
            </div>
            <div className='header'>
              <div className="navigation">
                <Link to="/">
                  <div className="logo-container">
                    <img src="/images/logo.png" alt="App Logo" className='logo' />
                    {/* <h1>Belkhairat Trading</h1> */}
                  </div>
                </Link>
              </div>
              <div className='header-content'>
              <img src="/images/logo.png" alt="logo" className='fixed-logo ' />
                <nav className="menu-container">
                  <ul>
                    <li><Link to="/">Acceuil</Link></li>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/blog">News</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
                </nav>
                <button className="mobile-menu">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>
          </header>
    )
}

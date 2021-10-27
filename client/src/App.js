import React from 'react';
import './assets/app.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './components/Home.js';
import Product from './components/Product.js';
import Category from './components/Category.js'
import Signin from './components/Signin.js';
import Projects from './components/Projects.js';
import BlogPage from './components/BlogPage.js';
import Dashbord from './components/Dashbord.js';
import AdminRoute from './components/modules/AdminRoute';
import Shop from './components/Shop';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';

function App(props) {

  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  // console.log(userInfo);

  if (window.innerWidth > 600) {
    window.onscroll = function(e) {
      const topBar = document.getElementById('topbar')
      const header = document.getElementById('header')
      if (this.oldScroll > this.scrollY) {
        if (topBar) {
          topBar.classList.remove('hide');
        }
      } else {
        if (topBar) {
          topBar.classList.add('hide');
        }
      }
      this.oldScroll = this.scrollY;
      if (this.scrollY < 5) {
        if (header) {
          header.classList.remove('dark');
        }
      } else {
        if (header) {
          header.classList.add('dark');
        }
      }
    }
  }
  return (

    <BrowserRouter>

      <div className="App">
        
        {/* <Header userInfo={userInfo} /> */}
        <Header  />
        <main>

          <Route path="/" exact={true} component={Home} />

          <Route path='/shop' exact={true} component={Shop} />

          <Route path='/product/:id' exact={true} component={Product} />

          <Route path='/category/:id' exact={true} component={Category} />

          <Route path='/projects' exact={true} component={Projects} />

          <Route path='/blog' exact={true} component={BlogPage} />

          <Route path='/gallery' exact={true} component={GalleryPage} />

          <Route path='/contact' exact={true} component={ContactPage} />

          <Route path='/signin' exact={true} component={Signin} />
          
          <AdminRoute path='/admin'>
            <Dashbord />
          </AdminRoute>

        </main>

        {/* <Footer userInfo={userInfo} /> */}
        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;

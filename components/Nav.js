import React, { Component } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Nav extends Component {

  componentDidMount() {
    const navBtn = document.querySelector('.nav-button');
    const navMenu = document.querySelector('.nav-menu');

    navBtn.addEventListener('click', () => {
      navBtn.classList.toggle('is-open');
      navMenu.classList.toggle('is-active');
    });
  }

  render() {
    return (
      <nav className="top-nav">
        <div className="brand">
          <Link href="/">
            <a>
              <h3>PLACES</h3>
            </a>
          </Link>
        </div>
        <ul className="nav-menu">
          <Link href="/">
            <a className="nav-item">Home</a>
          </Link>
          <Link href="/places">
            <a className="nav-item">Places</a>
          </Link>
          <Link href="/about">
            <a className="nav-item">About</a>
          </Link>
          <Link href="/faq">
            <a className="nav-item">FAQ</a>
          </Link>
          <Link href="/login">
            <a className="nav-item">Login</a>
          </Link>
        </ul>
        <div className="nav-button">
          <div className="mobile-btn">
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>    
    );
  }
}

// const Nav = () => (
//   <nav className="top-nav">
//     <div className="brand">
//       <Link href="/">
//         <a>
//           <h3>PLACES</h3>
//         </a>
//       </Link>
//     </div>
//     <ul className="nav-menu">
//       <Link href="/places">
//         <a className="nav-item">Places</a>
//       </Link>
//       <Link href="/about">
//         <a className="nav-item">About</a>
//       </Link>
//       <Link href="/faq">
//         <a className="nav-item">FAQ</a>
//       </Link>
//       <Link href="/login">
//         <a className="nav-item">Login</a>
//       </Link>
//     </ul>
//     <div className="nav-button">
//       <div className="mobile-btn">
//         <span />
//         <span />
//         <span />
//       </div>
//     </div>
//   </nav>
// );

export default Nav;

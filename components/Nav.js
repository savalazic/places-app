import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="top-nav">
    <div className="brand">
      <Link href="/">
        <a>
          <h3>PLACES</h3>
        </a>
      </Link>
    </div>
    <ul className="nav-menu">
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
  </nav>
);

export default Nav;

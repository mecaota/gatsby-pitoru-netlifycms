import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'

const Navbar = () => (
  <nav className="navbar is-fixed-top">
    <div className="container">
      <div className="tabs is-boxed is-medium">
        <ul>
          <li className="is-active"><Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Home" style={{ height: '24px' }} />
            &nbsp;&nbsp;Home
          </Link></li>
          <li><Link className="navbar-item" to="/about">
            About
          </Link></li>
          <li><Link className="navbar-item" to="/products">
            Products
          </Link></li>
          <li><Link className="navbar-item" to="/contact">
            Contact
          </Link></li>
          <li><Link className="navbar-item" to="/contact/examples">
            Form Examples
          </Link></li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Navbar

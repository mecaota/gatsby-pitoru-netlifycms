import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'

const Navbar = () => (
  <nav className="navbar is-fixed-top is-primary">
    <div className="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src={logo} alt="🏠" style={{ height: '2rem' }} />
            &nbsp;&nbsp;pitoruの多趣味日記++
        </div>
      </div>
      <div className="tabs is-boxed is-medium">
        <ul>
          <li className="is-active"><Link to="/" className="navbar-item" title="Home">
            Home
          </Link></li>
          <li><Link className="navbar-item" to="/about" title="About">
            About
          </Link></li>
          <li><Link className="navbar-item" to="/products" title="Products">
            Products
          </Link></li>
          <li><Link className="navbar-item" to="/blog" title="Blog">
            Blog
          </Link></li>
          <li><Link className="navbar-item" to="/contact" title="Contact">
            Contact
          </Link></li>
          <li><Link className="navbar-item" to="/contact/examples" title="Form Example">
            Form Examples
          </Link></li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Navbar

import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/logo.png';

const Navbar = ({menu}) => {
  function isActive(classnames, linkmenu){
    if(linkmenu === menu){
      return classnames+' is-active';
    }else{
      return classnames;
    }
  }
  return (
    <nav className='navbar is-fixed-top is-primary'>
      <div className='container'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <img src={logo} alt='🏠' style={{ height: '2rem' }} />
              &nbsp;&nbsp;pitoruの多趣味日記++
          </div>
        </div>
        <div className='tabs is-boxed is-medium'>
          <ul>
            <li className=''><Link to='/' className={isActive('navbar-item', 'home')} title='Home'>
              Home
            </Link></li>
            <li className=''><Link className={isActive('navbar-item', 'about')} to='/about' title='About'>
              About
            </Link></li>
            <li className=''><Link className={isActive('navbar-item', 'products')} to='/products' title='Products'>
              Products
            </Link></li>
            <li className=''><Link className={isActive('navbar-item', 'blog')} to='/blog' title='Blog'>
              Blog
            </Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

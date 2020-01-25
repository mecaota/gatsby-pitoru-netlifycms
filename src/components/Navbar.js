import React, { useState } from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.png';
import styles from '../style/navi.module.scss';

const Navbar = ({menu}) => {
  const [is_navi_open, set_navi_open] = useState(false);
  const isActive = (linkmenu)=>{
    if(linkmenu === menu){
      return styles.active;
    }else{
      return '';
    }
  };
  return (
    <nav className={is_navi_open ? `${styles.navi} ${styles.naviopen}` : styles.navi}>
      {/* 左ナビ */}
      <div className={styles.leftnavi}>
        <ul className={styles.leftnavi_inner}>
          <NavHamburger func={()=>{set_navi_open(!is_navi_open);}}/>
          <NavItem menuname='Home' path='/' classes={isActive('home')} />
          <NavItem menuname='About' path='/about' classes={isActive('about')} />
          <NavItem menuname='Works' path='/products' classes={isActive('products')} />
          <NavItem menuname='Blog' path='/blog' classes={isActive('blog')} />
        </ul>
      </div>

      {/* 右ナビ */}
      <div className={styles.rightnavi}>
        <span className={styles.rightnavi_inner}>
          <img src={logo} alt='🏠' style={{ height: '2rem' }} />
          <p>pitoruの多趣味日記++</p>
        </span>
      </div>
    </nav>
  );
};

const NavItem = ({menuname, path, classes})=> {
  return (
    <li>
      <Link to={path} className={classes} title={menuname}>{menuname}</Link>
    </li>
  );
};

const NavHamburger = ({func})=> {
  return (
    <li><button className={styles.hamburger} onClick={func}>
      <FontAwesomeIcon size='2x' icon={['fas', 'bars']} color='#ffffff' />
    </button></li>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'gatsby';

const Footer = () =>{
  return (
    <footer className="footer whiteback">
      <div className="content has-text-centered">
        <p>Made by <Link to="https://pito.run">pitoru</Link>. </p>
          <p>The source code is licensed
          <Link to="http://opensource.org/licenses/mit-license.php">MIT</Link>.</p>
      </div>
    </footer>
  );
};

export default Footer;

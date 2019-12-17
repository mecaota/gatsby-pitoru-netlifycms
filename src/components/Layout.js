import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import CookieConsent from 'react-cookie-consent';
import Navbar from '../components/Navbar';
import logo from '../img/logo.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import './all.sass';
library.add(fab, fas, far);

const TemplateWrapper = ({ slug, children, menu }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
              siteUrl,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet>
          <html lang='ja' />
          <title>{data.site.siteMetadata.title}</title>
          <meta name='theme-color' content='#1b5e20' />
          <meta name='description' content={data.site.siteMetadata.description} />
          <meta property='og:title' content={data.site.siteMetadata.title}/>
          <meta property='og:description' content={data.site.siteMetadata.description} />
          <meta property='og:image' content={logo} />
          <meta property='og:site_name' content='pitoruの多趣味日記' />
          <meta property='og:url' content={data.site.siteMetadata.siteUrl} />
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@mecaota' />
          <meta name='twitter:image' content={logo} />
          <meta property='fb:app_id' content='000000000000000'></meta>
        </Helmet>
        <Navbar menu={menu} />
        <div>{children}</div>
        <div className='message'>
          <CookieConsent buttonText='OK' containerClasses='message-header' disableStyles={false} style={{ background:'rgba(27, 94, 32, 0.9)'}} buttonStyle={{background:'#ffffff'}}>
            <p>当ウェブサイトではアクセス解析の為, Cookie並びにGoogle Analyticsによる情報収集を行っています。</p>
            <p>This site use Cookies and Google Analytics.</p>
          </CookieConsent>
        </div>
      </div>
    )}
  />
);

export default TemplateWrapper;

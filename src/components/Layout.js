import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ slug, children }) => (
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
          <html lang="ja" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="theme-color" content="#1b5e20" />
          <meta name="description" content={data.site.siteMetadata.description} />
          <meta property="og:title" content={data.site.siteMetadata.title}/>
          <meta property="og:description" content={data.site.siteMetadata.description} />
          <meta property="og:site_name" content="pitoruの多趣味日記" />
          <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@mecaota" />
          <meta property="fb:app_id" content="000000000000000"></meta>
        </Helmet>
        <Navbar />
        <div>{children}</div>
      </div>
    )}
  />
)

export default TemplateWrapper

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
          <meta name="description" content={data.site.siteMetadata.description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content={`${data.site.siteMetadata.siteUrl}${slug}twitter-card.jpg`}
          />
        </Helmet>
        <Navbar />
        <div>{children}</div>
      </div>
    )}
  />
)

export default TemplateWrapper

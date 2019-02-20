import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/Layout'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TumblrShareButton,
  TumblrIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  heroimage,
  date,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article>
      <section className="section section--gradient hero is-primary is-bold is-fixed">
        {helmet || ''}
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns is-multiline is-centered">
              <div className="column is-full nav-margin"></div>
              <div className="column is-full">
                <h1 className="title is-4 is-spaced">{title}</h1>
                <h2 className="subtitle is-6">{description}</h2>
              </div>
              <div className="column is-full">
                <p>投稿日: {date}</p>
              </div>
              <div className="column">
                {tags && tags.length ? (
                  <div className="field is-grouped is-grouped-multiline">
                    <div className="tags are-small">
                    <span className="tag is-dark is-small">Tags</span>
                      {tags.map(tag => (
                        <span className="tag is-small" key={tag + `tag`}>
                          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="column is-full"></div>
              <Img fluid={heroimage} className="column is-full" alt="記事のイメージ画像"/>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="content">
            <PostContent content={content} />
          </div>
          <ShareButtons url="https://pito.run/blog/" title={title} description={description}/>
        </div>
      </section>
    </article>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  heroimage: PropTypes.oneOfType(PropTypes.object),
  date: PropTypes.date,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ShareButtons = ({ url, title, description }) => {
  return (
    <div className="columns is-gapless is-mobile is-centered">
      <div className="column"></div>
      <div className="column">
        <p className="is-3">Share:</p>
        <a className="button" href={'https://mastoshare.net/post.php?text='+title} target="_blank" rel="noopener strict-origin origin" style={{'background-color': "#2b90d9"}}>Mastodon</a>
        <Link className="button">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} />
          </TwitterShareButton>
        </Link>
        <Link className="button">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
        </Link>
        <Link className="button">
          <TumblrShareButton url={url} title={title} caption={description}>
            <TumblrIcon size={32} />
          </TumblrShareButton>
        </Link>
        <Link className="button">
          <LineShareButton url={url} title={title}>
            <LineIcon size={32} />
          </LineShareButton >
        </Link>
        <Link className="button">
          <EmailShareButton url={url} subject={title}>
            <EmailIcon size={32} />
          </EmailShareButton>
        </Link>
      </div>
      <div className="column"></div>
  </div>
  )
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout menu="blog">
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        heroimage={post.frontmatter.image.childImageSharp.fluid}
        helmet={
          <Helmet
            titleTemplate="%s | pitoruの多趣味日記"
          >
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={post.frontmatter.description} />
            <meta property="og:title" content={post.frontmatter.title}/>
            <meta property="og:description" content={post.frontmatter.description} />
            <meta property="og:type" content="artcle" />
            <meta property="og:image" content={"https://pito.run"+ post.frontmatter.image.childImageSharp.fixed.src} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@mecaota" />
            <meta name="twitter:image" content={"https://pito.run"+ post.frontmatter.image.childImageSharp.fixed.src} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY/MM/DD")
        title
        description
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 600) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

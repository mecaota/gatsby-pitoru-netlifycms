import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  image,
  date,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article>
      <section className="hero is-primary is-bold is-fixed">
        {helmet || ''}
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns is-multiline">
              <div className="column is-full"></div>
              <div className="column is-10 is-offset-1">
                {tags && tags.length ? (
                  <div class="field is-grouped is-grouped-multiline nav-margin">
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
              <div className="column is-10 is-offset-1">
                <h1 className="title is-4 is-spaced">{title}</h1>
                <h2 className="subtitle is-6">{description}</h2></div>
              </div>
              <div className="column is-10 is-offset-1">
                <p>投稿日: {date}</p>
              </div>
              <div className="column is-full"></div>
              <Img fluid={image.childImageSharp.fluid} alt="記事のイメージ画像"/>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="image">
            
          </div>
          <div className="content">
            <PostContent content={content} />
          </div>
        </div>
      </section>
    </article>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  image: PropTypes.oneOfType(PropTypes.object),
  date: PropTypes.date,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        helmet={
          <Helmet
            titleTemplate="%s | pitoruの多趣味日記"
          >
            <title>{post.frontmatter.title}</title>
            <meta name="description" content={post.frontmatter.description} />
            <meta property="og:title" content={post.frontmatter.title}/>
            <meta property="og:description" content={post.frontmatter.description} />
            <meta property="og:type" content="artcle" />
            <meta property="og:image" content={post.frontmatter.image.childImageSharp.fixed.src} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@mecaota" />
            <meta name="twitter:image" content={post.frontmatter.image.childImageSharp.fixed.src} />
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

import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
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
      <section className="section hero is-fullheight is-fixed" style={{backgroundImage: `url(${image})`,}}>
        {helmet || ''}
        <div class="hero-body">
          <div className="container content is-fluid blur">
            <div className="columns is-0-mobile">
              <div className="column is-8 is-offset-1">
                {tags && tags.length ? (
                  <div class="field is-grouped is-grouped-multiline">
                    <div className="tags are-medium">
                    <span className="tag is-dark is-medium">Tags</span>
                      {tags.map(tag => (
                        <span className="tag is-medium" key={tag + `tag`}>
                          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="column is-2">
                <p>{date}</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <h1 className="title is-size-2 is-spaced">
                  {title}
                </h1>
                <p className="subtitle is-size-4">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
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
  image: PropTypes.string,
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
        image={!!post.frontmatter.image.childImageSharp ? post.frontmatter.image.childImageSharp.fluid.src : post.frontmatter.image}
        helmet={
          <Helmet
            titleTemplate="%s | pitoruの多趣味日記"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
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
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

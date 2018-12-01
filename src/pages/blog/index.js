import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="hero is-primary is-bold">
          <div class="hero-body">
            <div class="container">
              <h1 className="title is-2 nav-margin">投稿一覧</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div class="columns is-multiline is-primary">
              {posts
                .map(({ node: post }) => (
                  <div className="column is-half">
                    <div
                      className="card"
                      key={post.id}
                    >
                      <header className="card-header">
                        <p>
                          <Link className="card-header-title" to={post.fields.slug}>
                            {post.frontmatter.title}
                          </Link>
                        </p>
                      </header>
                      <div className="card-image">
                      <figure class="image is-2by1">
                        <Link to={post.fields.slug}>
                          <img src={!!post.frontmatter.image.childImageSharp ? post.frontmatter.image.childImageSharp.fluid.src : post.frontmatter.image} alt="記事イメージ画像" />
                        </Link>
                      </figure>
                        
                      </div>
                      <div className="card-content">
                        <div className="content">
                          {post.excerpt}
                        </div>
                        {post.frontmatter.tags && post.frontmatter.tags.length ? (
                          <div class="field is-grouped is-grouped-multiline">
                            <div className="tags">
                              <span className="tag is-dark is-medium">Tags</span>
                                {post.frontmatter.tags.map(tag => (
                                  <span className="tag is-medium" key={tag + `tag`}>
                                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}
                      </div>
                      <footer class="card-footer">
                        <div className="card-footer-item">
                          投稿日: {post.frontmatter.date}
                        </div>
                        <Link className="card-footer-item" to={post.fields.slug}>
                          続きを見る →
                        </Link>
                      </footer>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query BlogPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY/MM/DD")
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
    }
  }
`
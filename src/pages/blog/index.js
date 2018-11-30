import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 className="title is-2 nav-margin">投稿一覧</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div class="columns is-multiline">
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
                      <div className="card-content">
                        <div className="content">
                          {post.excerpt}
                        </div>
                      </div>
                      <footer class="card-footer">
                        <div className="card-footer-item">
                          {post.frontmatter.date}
                        </div>
                        <Link className="card-footer-item" to={post.fields.slug}>
                          Keep Reading →
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

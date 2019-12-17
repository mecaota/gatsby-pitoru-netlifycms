import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../../components/Layout';

export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout menu='blog'>
        <section className='section section--gradient hero is-primary is-bold is-fixed'>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title is-4 is-spaced nav-margin'>投稿一覧</h1>
            </div>
          </div>
        </section>
        <section className='section section--gradient'>
          <div className='container'>
            <div className='columns is-multiline is-primary'>
              {posts
                .map(({ node: post }) => (
                  <div className='column is-half'>
                    <div
                      className='card'
                      key={post.id}
                    >
                      <header className='card-header'>
                        <p>
                          <Link className='card-header-title' to={post.fields.slug}>
                            {post.frontmatter.title}
                          </Link>
                        </p>
                      </header>
                      <div className='card-image'>
                        <Link to={post.fields.slug}>
                          <Img
                            fixed={post.frontmatter.image.childImageSharp.fixed}
                            className='image is-2by1'
                            Tag='figure'
                            alt='記事のイメージ画像'
                            style={{width: '100%', height: '100%'}}
                          />
                        </Link>
                      </div>
                      <div className='card-content'>
                        <div className='content'>
                          {/*post.excerpt*/}
                          {post.frontmatter.description}
                        </div>
                        {post.frontmatter.tags && post.frontmatter.tags.length ? (
                          <div className='field is-grouped is-grouped-multiline'>
                            <div className='tags'>
                              <span className='tag is-dark is-medium'>Tags</span>
                                {post.frontmatter.tags.map(tag => (
                                  <span className='tag is-medium' key={tag + 'tag'}>
                                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}
                      </div>
                      <footer className='card-footer'>
                        <div className='card-footer-item'>
                          投稿日: {post.frontmatter.date}
                        </div>
                        <Link className='card-footer-item' to={post.fields.slug}>
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
    );
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query BlogPageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "YYYY/MM/DD")
            tags
            image {
              childImageSharp {
                fixed(width: 400, height:200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;

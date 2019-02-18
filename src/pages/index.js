import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image_index: 0
    };
    this.up_imageindex = this.up_imageindex.bind(this);
    this.down_imageindex = this.down_imageindex.bind(this);
  }
  up_imageindex = () => {
    const nowindex = this.state.image_index;
    if(nowindex<5){
      this.setState((prev) => {
        return {
          image_index: prev.image_index + 1
        };
      //this.setState({image_index: nowindex+1});
      });
    }
  }
  down_imageindex = () => {
    const nowindex = this.state.image_index;
    if(0<nowindex){
      //this.setState({image_index: nowindex-1});
      this.setState((prev) => {
        return {image_index: prev.image_index - 1};
      });
    }
  }
  render() {
    var image_index=0;
    const { data } = this.props
    const image = data.imageOne
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout menu="home">
        <section className="">
          <div className="hero is-fullheight is-primary is-bold is-fixed" style={{backgroundImage: `url(${!!image.childImageSharp ? image.childImageSharp.fluid.src : image})`,}}>
            <div className="hero-body">
              <div className="container .blur">
                <h1 className="title">pito.run</h1>
                <h2 className="subtitle">Welcome</h2>
              </div>
            </div>
            
            <div className="hero-foot">
              <div className="container has-text-centered .blur">
                <button className="button is-primary" onClick={this.down_imageindex.bind(this)}>←</button>
                <button className="button is-primary" onClick={this.up_imageindex.bind(this)}>→</button>
                {this.state.image_index}
                <p>↓</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em' }}
                  key={post.id}
                >
                  <p>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </section>
        <section className="section">
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
    image: PropTypes.oneOfType(PropTypes.object)
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    imageOne: file(relativePath: {eq: "top.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 2048, quality: 100) {
          src
          originalName
        }
      }
    }
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
          }
        }
      }
    }
  }
`

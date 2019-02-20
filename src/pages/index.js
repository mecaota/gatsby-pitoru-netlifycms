import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Hero extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image_index: 0,
      images: this.props.images,
      heroimage: "background-cover fadein"
    };
  }
  up_imageindex = () => {this.set_imageindex(this.state.image_index+1);}
  down_imageindex = () => {this.set_imageindex(this.state.image_index-1);}
  set_imageindex = (index) => {
    return new Promise((resolve)=>{
      return resolve(this.setState({heroimage:"background-cover fadeout"}));
    }).then(()=>{
      this.changeImage(index);
    }).then(()=>{
      setTimeout(()=>{this.setState({heroimage:"background-cover fadein"})},500);
    })
  }
  changeImage = (index) => {
    setTimeout(()=>{
      if(this.state.images.length-1<index){
        return this.setState({image_index:0});
      }else if(index<0){
        return this.setState({image_index:this.state.images.length-1});
      }else{
        return this.setState({image_index:index});
      }
    }, 500);
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => {
        this.up_imageindex();
      },
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render(){
    return (
      <div>
        <img className={this.state.heroimage} src={this.state.images[this.state.image_index]} alt="sample" width="150" height="100"/>
        <section className="section hero is-fullheight is-fixed">
          <div className="hero-body">
            <div className="container blur">
              <h1 className="title">pito.run</h1>
              <h2 className="subtitle">Welcome</h2>
            </div>
          </div>
          <div className="hero-foot">
            <div className="container has-text-centered .blur">
              <nav className="pagination is-centered is-rounded is-small" role="navigation" aria-label="pagination">
                <button className="pagination-previous is-size-4" onClick={this.down_imageindex.bind(this)}>←</button>
                <button className="pagination-next is-size-4" onClick={this.up_imageindex.bind()}>→</button>
                <ul className="pagination-list">
                  {
                    this.state.images.map(
                      (image, index) => (
                        <li><button className={index==this.state.image_index?"pagination-link is-current":"pagination-link"} aria-label={"画像"+index} onClick={this.set_imageindex.bind(this, index)}>{index}</button></li>
                      )
                    )
                  }
                </ul>
              </nav>
              <span><FontAwesomeIcon color="white" className="swipe-anime" icon={['fas', 'chevron-down']} size="3x"/></span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    const images = [!!data.image1.childImageSharp ? data.image1.childImageSharp.fluid.src : data.image1, !!data.image2.childImageSharp ? data.image2.childImageSharp.fluid.src : data.image2];
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout menu="home">
        <Hero images={images}/>
        <section className="section whiteback">
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
                    {/*post.excerpt*/}
                    {post.frontmatter.description}
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
        <footer className="footer whiteback">
          <div className="content has-text-centered">
            <p>Made by <a href="https://pito.run">pitoru</a>. </p>
              <p>The source code is licensed
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.</p>
          </div>
        </footer>
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
    image1: file(relativePath: {eq: "top/top.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 2048, quality: 100) {
          src
          originalName
        }
      }
    }
    image2: file(relativePath: {eq: "top/test.jpg"}) {
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
            description
            templateKey
            date(formatString: "YYYY/MM/DD")
          }
        }
      }
    }
  }
`

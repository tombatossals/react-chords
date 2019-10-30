import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

const Header = ({ siteTitle, data }) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "github-logo.png" }) {
          childImageSharp {
            fixed(width: 100, height: 41) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <header className="bg-green text-white py-6">
        <div className="container flex items-center justify-between mx-auto px-4">
          <h1 className="text-2xl">
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              {siteTitle}{" "}
            </Link>{" "}
          </h1>{" "}
          <div className="max-w-sm mx-auto flex p-1 bg-white opacity-75 hover:opacity-100 rounded-lg shadow-xl">
            <a href="http://github.com/tombatossals/react-chords">
              <Img style={{ margin: 0 }} fixed={data.file.childImageSharp.fixed} />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </header>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

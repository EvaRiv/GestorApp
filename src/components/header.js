import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./customize.css"
import key from "../images/key.svg"

const Header = ({ siteTitle }) => (
  <header class = "header">
    <div class = "headerContainer">
      <p class = "headerTitle" style={{ margin: 0 , color: 'white' }}>
        {siteTitle}
      </p>
      <img class = "headerIcon" src = {key}/>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

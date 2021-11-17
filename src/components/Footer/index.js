// import {Component} from 'react'

import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

function Footer() {
  return (
    <div className="footer-container">
      <h1 className="main-heading">Tasty Kitchens</h1>
      <p className="paragraph">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>
      <div className="contacts">
        <FaPinterestSquare className="logos" />
        <FaInstagram className="logos" />
        <FaTwitterSquare className="logos" />
        <FaFacebookSquare className="logos" />
      </div>
    </div>
  )
}
export default Footer

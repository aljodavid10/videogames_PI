import React from 'react'
import "./LandingPage.css"
import { Link } from 'react-router-dom';

function LandingPage({submit, onLoadHome }) {
  return (
    <div className='landingPage'>
      <div className="wrapper">
        <Link to='/home'>
          <button className='inicio' onClick={onLoadHome}>
            Start 
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
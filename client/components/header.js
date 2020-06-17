import React from 'react'

import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className="flex justify-between bg-blue-600 text-white">
      <div id="repository-name" className="text-center px-4 py-2 m-2">
        {props.userName}
      </div>
      <div className="text-center px-4 py-2 m-2">{props.userRepository} </div>
      <div id="go-back" className="text-center px-4 py-2 m-2">
        <Link to="/">Go Back</Link>{' '}
      </div>

      <div id="go-repository-list" className="text-center px-4 py-2 m-2">
        <Link to={props.Link} id={props.id}>
          {props.description}
        </Link>{' '}
      </div>
    </div>
  )
}

export default Header

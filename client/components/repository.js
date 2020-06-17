import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import Header from './header'

import './dummy-view.scss'

const Repository = (props) => {
  const { userName, userRepository } = useParams()
  return (
    <div>
      <Header
        userName={userName}
        userRepository={userRepository}
        Link={`/${userName}`}
        id="#go-repository-list"
        description="Go Repository List"
      />
      {/* {JSON.stringify(props.repositories)} */}
      <div id="description">
        <ReactMarkdown source={props.readme} />
      </div>
    </div>
  )
}
export default Repository

import React from 'react'
import { useParams, Link } from 'react-router-dom'

import Header from './header'

import './dummy-view.scss'


const ListOfRepository = (props) => {
  const { userName } = useParams()
  return (
    <div>
      <Header userName ={userName} />
            {props.repositories.map((elem) => {
              return <div key={elem.name}><Link to={`/${userName}/${elem.name}`}>{elem.name}</Link></div>
            })}
 
    </div>
  )
}

export default ListOfRepository

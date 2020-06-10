import React, {useState} from 'react'
import Head from './head'
import './dummy-view.scss'
import { history } from '../redux'


const Dummy = () => {
  const [user, setUser] = useState('')
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen ">
        <div className="bg-indigo-800 font-bold rounded-lg border shadow-lg p-10">
          <input id = "input-field" className="bg-gray-400 placeholder-gray-600 focus:placeholder-gray-500 ..." value={user} type="text" placeholder="введите данные"onChange={(e) => setUser(e.target.value)}/>
          <button id="search-button" type="submit" className="m-1 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline ... " onClick={() => history.push(`/${user}`)}>
            click
          </button>
        </div>
      </div>
    </div>
  )

}

Dummy.propTypes = {}

export default React.memo(Dummy)

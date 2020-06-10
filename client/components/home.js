import React, { useState, useEffect  } from 'react'
import { Route, useParams } from 'react-router-dom'
import axios from 'axios'
import Head from './head'
import Dummy from './dummy-view'
import ListOfRepository from './list-of-repository'
import Repository from './repository'

// import wave from '../assets/images/wave.jpg'




const Home = () => {
  const [repositories, setRepositories] = useState([])
  const [readme, setReadme] = useState('')
  const { userName,userRepository } = useParams()

  useEffect(()=>{
    if (typeof userName !== 'undefined')
      axios(`https://api.github.com/users/${userName}/repos`).then((it) => {
        setRepositories(it.data)
      })
      if (typeof userRepository !== 'undefined')
      axios(`https://raw.githubusercontent.com/${userName}/${userRepository}/master/README.md`).then((it) => {
        setReadme(it.data)
      })
    return () => {}
  }, [userName, readme])
  
  return (
    <div>
      <Head title="Hello" />
     
      {/* <img alt="wave" src="images/wave.jpg" />
      <button type="button" onClick={() => setCounterNew(counter + 1)}>
        updateCounter
      </button>
      <div> Hello World Dashboard {counter} </div> */}
      <Route exact path="/" component={() =>  <Dummy />} />
      <Route exact path="/:userName" component={() => <ListOfRepository repositories={repositories} setRepositories={setRepositories}/>} />
      <Route exact path="/:userName/:userRepository" component={() => <Repository readme= {readme} setReadme={setReadme}/>} />
    </div>
  )
}

Home.propTypes = {}

export default Home

import Post from './Post'
import './styles/styles.css'
import img from './assets/obEK0XlX-NA.jpg'
import './babel'
import React from 'react'
import {render} from "react-dom";

const post = new Post("Webpacksss", img)

const App = () => {
  return <div>
    Првиет
    <div className="container">
      <h1>Webpack Course</h1>
      <div>u</div>

      <hr/>
      <div className="logo"></div>
    </div>

  </div>
}

render(<App/>, document.getElementById('app'))
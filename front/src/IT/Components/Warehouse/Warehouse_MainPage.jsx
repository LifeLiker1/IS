import React from 'react'
import "./sklad.scss"
import Working_Parts from './Working_Parts/Working_Parts'
import Faulty_Parts from "./Faulty_Parts/Faulty_Parts"
import Header from '../../../Header/Header'

const sklad = () => {
  document.title="Склад"
  return (
    <div>
      <Header/>
      <div className="sklad_body">
        <div className='left_column'>
          <Working_Parts/>
        </div>
        <div className='right_column'>
          <Faulty_Parts/>
        </div>
      </div>
    </div>
  )
}

export default sklad
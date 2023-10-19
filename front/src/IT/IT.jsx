import React from 'react'
import Header from './Header/ITHeader'
import Table from './Table/Table'
import "./IT.scss"
const IT = () => {
  return (
    <div>
      <Header/>
        <div className="main_block">
          <Table/>
        </div>
    </div>
  )
}

export default IT
import React from 'react'
import CategoryIndex from './category_index'
import SidePanel from '../side_panel'

class Discover extends React.Component {

  render() {
    return(
      <div className="main-body discover">
        <CategoryIndex />
        <SidePanel />
      </div>
    )
  }
}

export default Discover;
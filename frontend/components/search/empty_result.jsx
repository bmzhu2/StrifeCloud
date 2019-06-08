import React from 'react'

const EmptyResult = (props) => (
  <div className="empty-result">
    <i className="fas fa-search"></i>
    <p>Sorry we didn't find any results for "{props.query}".</p>
    <p>Check the spelling, or try a different search.</p>
  </div>
)

export default EmptyResult
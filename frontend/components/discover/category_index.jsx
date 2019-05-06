import React from 'react';
import CategoryIndexItem from './category_index_item';

class CategoryIndex extends React.Component{

  render() {
    return(
      <div className="category-index">
        <CategoryIndexItem />
        <CategoryIndexItem />
        <CategoryIndexItem />
        <CategoryIndexItem />
      </div>
    )
  }
}

export default CategoryIndex;
import React from 'react';
import CategoryIndexItem from './category_index_item';

class CategoryIndex extends React.Component{

  render() {
    return(
      <div className="category-index">
        <CategoryIndexItem category="Trending" description="Trending this week"/>
        <CategoryIndexItem category="Classics" description="These songs stand the test of time"/>
        <CategoryIndexItem category="Piano" description="Listen to your favorites reimagined on piano"/>
        <CategoryIndexItem category="Battle Themes" description="You will make it through!"/>
      </div>
    )
  }
}

export default CategoryIndex;
import React from 'react';
import CategoryIndexItem from './category_index_item';

class CategoryIndex extends React.Component{

  render() {
    return(
      <div className="category-index">
        <CategoryIndexItem category="Trending" description="Trending this week" songs={[30, 8, 16, 24]}/>
        <CategoryIndexItem category="Classics" description="These songs stand the test of time" songs={[17, 26, 23, 12]}/>
        <CategoryIndexItem category="Piano" description="Listen to your favorites reimagined on piano" songs={[1, 20, 19, 31]}/>
        <CategoryIndexItem category="Boss" description="Bound to get your adrenaline going" songs={[4, 10, 35, 7]}/>
        <CategoryIndexItem category="Emotional" description="Come and shed a tear" songs={[29, 13, 22, 27]}/>
      </div>
    )
  }
}

export default CategoryIndex;
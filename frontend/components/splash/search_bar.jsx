import React from 'react';
import {withRouter} from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: ""
    }

    this.updateSearch = this.updateSearch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  updateSearch(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleSearch() {
    if (this.state.query) {
      this.props.history.push(`/search?query=${this.state.query}`)
    }
  }
  render() {
    return (
      <div className="splash-below-banner">
        <form className="splash-search-bar">
          <input
            className="splash-search-box"
            type="text"
            placeholder="Search for artists or songs (e.g. Aerith)"
            onChange={this.updateSearch}></input>
          <button onClick={this.handleSearch} className="splash-search-submit"><i className="fas fa-search"></i></button>
        </form>
        <p className="splash-below-banner-or">or</p>
        <button className="splash-below-banner-upload" onClick={() => this.props.history.push("/upload/")}>Upload your own</button>
      </div>
    )
  }
}

export default withRouter(SearchBar);
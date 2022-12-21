/* eslint-disable no-undef */
import React from 'react'
import debounce from 'lodash.debounce'
import './SearchInput.css'

export default class SearchInput extends React.Component {
  render() {
    const { searchMovie } = this.props

    return (
      <label>
        <input
          type="text"
          className="search-input"
          placeholder="Type to search..."
          onChange={debounce(searchMovie, 500, [])}
          autoFocus
        ></input>
      </label>
    )
  }
}

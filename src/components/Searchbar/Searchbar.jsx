import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
// import { toast } from 'react-toastify';

export default class SearchBar extends Component {
  state = {
    searcheValue: '',
  };

  handleValueChange = event => {
    this.setState({ searcheValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searcheValue.trim() === '') {
      alert('Enter any word to search');
    }
    this.props.onSubmit(this.state.searcheValue);
    this.setState({ searcheValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label"></span>
            <FiSearch size={24} />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="searcheValue"
            value={this.state.searcheValue}
            onChange={this.handleValueChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabledSearchButton: true,
    };
  }

  onInputSearch = ({ target }) => {
    const minValue = 2;
    const { value } = target;
    this.setState({
      disabledSearchButton: value.length < minValue,
    });
  };

  render() {
    const { disabledSearchButton } = this.state;
    return (
      <>
        <div>
          <Header />
          <div data-testid="page-search" />
        </div>
        <div>
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onInputSearch }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabledSearchButton }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;

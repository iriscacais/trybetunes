import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      loading: false,
      disabledSearchButton: true,
      albuns: [],
      artista: '',
    };
  }

  onInputSearch = ({ target }) => {
    const minValue = 2;
    this.setState({
      input: target.value,
      disabledSearchButton: target.value.length < minValue,
      artista: target.value,
    });
  };

  onSearchButtonClick = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { input } = this.state;
    const albuns = await searchAlbumsAPI(input);
    this.setState({
      loading: false,
      albuns,
      input: '',
    });
  };

  render() {
    const { albuns, disabledSearchButton, input, loading, artista } = this.state;
    return (
      <>
        <div>
          <Header />
          <div data-testid="page-search" />
        </div>
        <div>
          <form className="searchForm">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onInputSearch }
              value={ input }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabledSearchButton }
              onClick={ this.onSearchButtonClick }
            >
              Pesquisar
            </button>
          </form>
          {
            loading ? <Loading /> : null // se loading for verdadeiro renderiza o componente Loading. Se nao permanece na página de login em que já estamos.
          }
          {
            albuns.length > 0 && (
              <div className="listAlbuns">
                {`Resultado de álbuns de: ${artista}`}
              </div>
            )
          }
          {
            albuns.length === 0 && <p className="text"> Nenhum álbum foi encontrado</p>
          }
          {
            albuns.length > 0 && (
              <ul className="theAlbuns">
                {
                  albuns.map(((album) => (
                    <li key={ album.collectionId } className="eachAlbum">
                      {album.collectionName}
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        className="buttonForTheAlbum"
                      >
                        álbum
                      </Link>
                    </li>
                  )))
                }
              </ul>
            )
          }
        </div>
      </>
    );
  }
}

export default Search;

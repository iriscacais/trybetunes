import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false, // definindo o estado de carregando como falso
      name: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  } // chamo a funçao ao carregar o componente header!

  getUserName = async () => {
    this.setState({ loading: true });
    const userName = await getUser();
    this.setState(() => ({
      loading: false,
      name: userName.name,
    }));
  }; // essa funcao de forma assincrona, enquanto espera o estado de loading muda para true, após a funcao getUser ser executada retorna o estado com loading falso e o valor username (input)

  render() {
    const { name, loading } = this.state;
    if (loading) return <Loading />; // se o estado loading for true retorna o componete Loading. Se nao retorna o codigo abaixo!
    return (
      <header data-testid="header-component" className="mainHeader">
        <h3 data-testid="header-user-name" className="userName">
          Olá
          {' '}
          {name}
          !

        </h3>
        <div className="headerLinks">
          <Link to="/search" data-testid="link-to-search" className="link">Procurar</Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            Favoritas

          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="link">Perfil</Link>
        </div>
      </header>
    );
  }
}
export default Header;

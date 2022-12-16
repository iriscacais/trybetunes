import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <header data-testid="header-component">
        <h3 data-testid="header-user-name">
          {name}
        </h3>
        <Link to="/search" data-testid="link-to-search">Procurar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}
export default Header;

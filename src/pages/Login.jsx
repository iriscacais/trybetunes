import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '', // estado do campo de imput que recebera um valor
      disabledButton: true, // estado para que o botao comece desabilitado
      loading: false, // estado para que o loading ainda nao tenha carregado
      redirectSearch: false, // estado para que ainda nao ocorra o redirect
    };
  }

  onInputChange = ({ target }) => {
    const minValue = 3;
    const name = target.value;
    this.setState({
      name: target.value,
      disabledButton: name.length < minValue,
    });
  }; // essa funçao será responsável por pegar o valor colocado no input e verificar se possui o tamanho correto. Pelo menos 3 caracteres. Declara que o disable button está desabilitado caso o name.length seja inferior ao valor minimo.

  onEnterButtonClick = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const { name } = this.state;
    await createUser({ name });
    this.setState({
      loading: false,
      redirectSearch: true,
    });
  }; // essa é uma funcao assincrona em que ao clicar no botao mudamos o estado de loading para true. Esperamos a funçao createUser ser chamada com o parametro name (do input ) e entao o estado de loading muda para falso e o redirect para true.

  render() {
    const { name, disabledButton, loading, redirectSearch } = this.state;
    return (
      <section>
        <p className="Title">TrybeTunes</p>
        <div data-testid="page-login" className="formLogin">
          <form>
            <label htmlFor="nome" className="form-control">
              Nome
              <input
                id="floatingInputValue"
                className="input-group mb-3"
                type="text"
                name="nome"
                data-testid="login-name-input"
                value={ name }
                onChange={ this.onInputChange }
              />
              <button
                className="btn btn-outline-secondary"
                onClick={ this.onEnterButtonClick }
                type="button"
                data-testid="login-submit-button"
                disabled={ disabledButton }
              >
                Entrar
              </button>
            </label>
          </form>
          {
            loading ? <Loading /> : null // se loading for verdadeiro renderiza o componente Loading. Se nao permanece na página de login em que já estamos.
          }
          {
            redirectSearch ? <Redirect to="/search" /> : null // se redirectSearch for true redirecionamos para a página search, se nao permanecemos na página de login em que já estamos.
          }
        </div>
      </section>
    );
  }
}

export default Login;

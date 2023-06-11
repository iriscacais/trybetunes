import React from 'react';
import './Login.css';
import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="divCarregando">
        <p className="carregando">Carregando...</p>
      </div>
    );
  }
}

export default Loading;

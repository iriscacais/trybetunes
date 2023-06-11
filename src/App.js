/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  }
}

export default App;

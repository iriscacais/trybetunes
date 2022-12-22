import { shape, string } from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicasAlbum: [],
    };
  }

  componentDidMount() {
    this.getMusicsApi();
  }

  getMusicsApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musicasAlbum: musics[0],
      musicas: musics.slice(1),
    });
  };

  render() {
    const { musicasAlbum, musicas } = this.state;
    return (
      <>
        <div>
          <Header />
          <div data-testid="page-album" />
        </div>
        <section>
          <h1 data-testid="artist-name">
            { musicasAlbum.artistName }
          </h1>

          <h1 data-testid="album-name">
            { musicasAlbum.collectionName }
          </h1>
        </section>
        <ul>
          {
            musicas
              ? musicas.map((musica) => (
                <li key={ musica.trackId }>
                  <MusicCard
                    { ... musica }
                  />
                </li>
              )) : null
          }
        </ul>
      </>
    );
  }
}

Album.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Album;

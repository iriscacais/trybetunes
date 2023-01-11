import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    favoriteMusics: false,
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      favoriteMusics: await this.myFavoriteMusic(),
    });
  }

  myFavoriteMusic = async () => {
    const { trackName } = this.props;
    const myMusics = await getFavoriteSongs();
    return myMusics.map((music) => music.trackName).includes(trackName);
  };

  handleFavoriteMusic = async ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(music);
      this.setState({
        favoriteMusics: true,
        loading: false,
      });
    } else {
      await removeSong(music);
      this.setState({
        favoriteMusics: false,
        loading: false,
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favoriteMusics, loading } = this.state;
    return (
      <>
        { loading && <Loading />}
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            data-testid={ `checkbox-music-${trackId} ` }
            checked={ favoriteMusics }
            onChange={ this.handleFavoriteMusic }
          />
        </label>
      </>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;

import { connect } from 'react-redux';
import {
  getPhotos,
  getPhoto,
  updatePhoto,
  deletePhoto
} from '../../actions/photo_actions';
import Photos from './photos';

const msp = state => {
  return {
    currentUser: state.session.currentUser,
    photos: Object.values(state.entities.photos)
  };
};

const mdp = dispatch => ({
  getPhotos: () => dispatch(getPhotos()),
  getPhoto: (id) => dispatch(getPhoto(id)),
  updatePhoto: (photo) => dispatch(updatePhoto(photo)),
  deletePhoto: (id) => dispatch(deletePhoto(id))
});

export default connect(msp, mdp)(Photos);

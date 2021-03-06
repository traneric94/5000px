import { connect } from 'react-redux';
import { getUserPhotos, getOtherPhotos } from "../../reducers/selectors";
import PhotoFeed from "./photo_feed";
import {
    getPhotos,
    getPhoto,
    updatePhoto,
    deletePhoto
} from '../../actions/photo_actions';

const msp = (state, ownProps) => {
    return {
        currentUser: state.session.currentUser,
        otherPhotos: getOtherPhotos(state),
        ownPhotos: getUserPhotos(state, ownProps.userId),
        errors: state.errors,
        loading: state.ui.loading.indexLoading

    };
};

const mdp = dispatch => ({
    getPhotos: (page) => dispatch(getPhotos(page)),
    getPhoto: (id) => dispatch(getPhoto(id)),
    updatePhoto: (photo) => dispatch(updatePhoto(photo)),
    deletePhoto: (id) => dispatch(deletePhoto(id))
});

export default connect(msp, mdp)(PhotoFeed);

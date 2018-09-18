import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import Profiles from './profiles';
import { getOtherUsers, getFollowedUsers } from '../../reducers/selectors';

const msp = state => {
  return {
    currentUser: state.session.currentUser,
    users: Object.values(state.entities.users),
    otherUsers: getOtherUsers(state),
    loading: state.ui.loading.indexLoading,
    followedUsers: getFollowedUsers(state)
  };
}

const mdp = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(msp, mdp)(Profiles);

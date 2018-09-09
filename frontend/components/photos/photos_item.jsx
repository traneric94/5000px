import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import PhotoFormContainer from '../photo_form/photo_form_container';
import PhotoEditContainer from './photo_edit_container'

const customStyles = {
  content : {
    'height' : 'fit-content',
    'width'  : 'fit-content',
    'margin' : 'auto',
  }
};

Modal.setAppElement(document.getElementById('root'));

class PhotosItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:  false,
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    this.subtitle.style.color = '#foo';
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
    this.setState({ visible: false })
  }

  renderEdit() {

    this.setState({ visible: !this.state.visible})
  }

  toggleEditCancel() {
    return ((this.state.visible) ? (
        <button className="action-button"
          onClick={this.renderEdit.bind(this)}>Cancel
        </button>
      ) : (
        <button className="action-button"
          onClick={this.renderEdit.bind(this)}>Edit
        </button>
      )
    )
  }

  renderButton() {
    if (this.props.currentUser.id === this.props.photo.author_id) {
      return (
        <div className="form-buttons">
          {this.toggleEditCancel()}
          <button
            className="action-button"
            id="delete"
            onClick={() => this.props.deletePhoto(this.props.photo.id)
            .then(() => location.reload())}>Delete</button>
        </div>
      )
    } else {
      return (
        <button className="action-button"> Like </button>
      )
    }
  }

  render() {
    let display = this.state.visible ? (
      <div>
        <PhotoEditContainer photo={this.props.photo} />
        {this.renderButton()}</div>
    ) : (
      <div className="show">
        <div className="open-pic">
          <img src={this.props.photo.photoUrl}/></div>
        <div className="details">
          <h1 ref={subtitle => this.subtitle = subtitle}>
            {this.props.photo.title} </h1>
          <h2>{this.props.photo.description}</h2>
          {this.renderButton()}
        </div>
      </div>
    );
    console.log(this)
    return (
      <div>
        <img
          className="default-pic"
          src={this.props.photo.photoUrl}
          onClick={this.openModal} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false} >
          {display}
        </Modal>
      </div>
    )
  }
}

export default PhotosItem;

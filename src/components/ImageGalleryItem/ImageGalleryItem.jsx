import React, { Component } from 'react';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { id, webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;

    return (
      <li key={id} className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={this.openModal}
          loading="lazy"
        />
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </li>
    );
  }
}

// const ImageGalleryItem = ({ id, webformatURL, tags, onClick }) => {
//   return (
//     <li key={id} className="ImageGalleryItem" onClick={onClick}>
//       <img
//         className="ImageGalleryItem-image"
//         onCkick={() => {
//           this.props.();
//         }}
//         src={webformatURL}
//         alt={tags}
//       />
//     </li>
//   );
// };

export default ImageGalleryItem;

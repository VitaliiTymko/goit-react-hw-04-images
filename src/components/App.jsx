import React, { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import '../css/styles.css';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    searchString: '',
    page: 1,
    showModal: false,
  };

  handleFormSubmit = searchString => {
    this.setState({ searchString });
    this.setState({
      page: 1,
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searcheValue={this.state.searchString}
          page={this.state.page}
        />
        {/* <ToastContainer theme="colored" autoClose={3000} /> */}
        {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button> */}
        {/* {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <h2>Тут будет модалка с картинкой</h2>
            <button type="button" onClick={this.toggleModal}>
              Close modal
            </button>
          </Modal>
        )} */}
      </div>
    );
  }
}

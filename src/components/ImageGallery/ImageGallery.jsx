import React, { Component } from 'react';
import { Dna } from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    photos: [],
    pageActive: this.props.page,
    error: null,
    status: 'idle',
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.searcheValue;
    const nextValue = this.props.searcheValue;

    window.scrollTo(0, document.body.scrollHeight);

    if (prevValue !== nextValue) {
      // console.log('Вот и изменилось значение, надо скинуть страницу.');
      this.setState({
        pageActive: 1,
        photos: [],
      });
    }

    if (
      prevValue !== nextValue ||
      prevState.pageActive !== this.state.pageActive
    ) {
      console.log('Изменилась строка ввода');
      console.log(
        'Предыдущее значение prevState.pageActive',
        prevState.pageActive
      );
      console.log(
        'Новое значение this.state.pageActive',
        this.state.pageActive
      );

      // console.log('Предыдущее значение prevProps.page', prevProps.page);
      // console.log('Новое значение this.props.page', this.props.page);

      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${nextValue}&page=${this.state.pageActive}&key=31423589-05a77bf58d80d41712d5d29e1&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(responce => {
          if (responce.ok) {
            return responce.json();
          }
          return Promise.reject(
            new Error(
              `Нет изображений с таким ${nextValue}, введите новое значение`
            )
          );
        })
        .then(data => {
          console.log('photos after fetch', data);
          this.setState(prevState => ({
            photos: [...prevState.photos, ...data.hits],
            status: 'resolved',
            totalHits: data.totalHits,
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  // LoadMore = prevProps => {
  //   this.props.page = prevProps.page + 1;
  // };

  loadMore = event => {
    event.preventDefault();

    this.setState(prevState => ({
      pageActive: prevState.pageActive + 1,
    }));
  };

  render() {
    const { photos, error, status } = this.state;
    // const { searcheValue } = this.props;

    // if (photos !== null) {
    //   if (photos.hits.length === 0) {
    //     console.log('photos:', photos);
    //     return (
    //       <div>
    //         <h2 className="idle">
    //           Нет изображений с таким {searcheValue}, введите новое значение
    //         </h2>
    //       </div>
    //     );
    //   }
    // }

    if (status === 'idle') {
      return (
        <div>
          <h2 className="idle">Введите слово для поиска изображения</h2>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <h2 className="pending">
          Loading, wait....
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </h2>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
          {this.state.totalHits / 12 > this.state.pageActive && (
            <Button loadMore={this.loadMore} />
          )}
        </ul>
      );
    }

    // return (
    //   <div
    //     style={{
    //       height: '100vh',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       fontSize: 40,
    //       color: '#010101',
    //     }}
    //   >
    //     {error && (
    //       <h1>
    //         {error.message}
    //         {/* Нет изображений с таким {searcheValue}, введите новое значение */}
    //       </h1>
    //     )}
    //     {!searcheValue && <div>Введите слово для поиска изображения</div>}
    //     {loading && <h2>Loading, wait....</h2>}
    //     {photos && (
    //       <>
    //         {/* Тут будет разметка галлереи */}
    //         <ul className="gallery">
    //           {photos.hits.map(({ id, webformatURL, tags }) => (
    //             <ImageGalleryItem
    //               key={id}
    //               id={id}
    //               webformatURL={webformatURL}
    //               tags={tags}
    //             />
    //           ))}
    //         </ul>
    //       </>
    //     )}
    //   </div>
    // );
  }
}

import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        { src: '15.jpg' },
        { src: '16.jpg' },
        { src: '17.jpg' },
        { src: '18.jpg' },
        { src: '19.jpg' },
        { src: '20.jpg' },
        { src: '21.jpg' },
        { src: '22.jpg' },
        { src: '23.jpg' },
        { src: '24.jpg' },
        { src: '25.jpg' },
        { src: '26.jpg' },

      ],
      currentIndex: 0,
      fullScreen: false,
    };
  }

  componentDidMount() {
    this.initCarousel();
    this.startAutoSlide();
  }

  componentWillUnmount() {
    this.stopAutoSlide();
  }

  initCarousel() {
    const { M } = window;
    if (M && M.Carousel) {
      M.Carousel.init(this.carousel, {
        fullWidth: true,
        indicators: false, // Remove indicators
        numVisible: 2, // Display two images at a time
      });
    }
  }

  handlePrev = () => {
    const { M } = window;
    if (M && M.Carousel) {
      const instance = M.Carousel.getInstance(this.carousel);
      instance.prev();
    }
  }

  handleNext = () => {
    const { M } = window;
    if (M && M.Carousel) {
      const instance = M.Carousel.getInstance(this.carousel);
      instance.next();
    }
  }

  toggleFullScreen = () => {
    this.setState((prevState) => ({
      fullScreen: !prevState.fullScreen,
    }));
  };

  startAutoSlide = () => {
    this.autoSlideInterval = setInterval(this.handleNext, 4000); // Auto slide every 4 seconds
  }

  stopAutoSlide = () => {
    clearInterval(this.autoSlideInterval);
  }

  render() {
    const { images, currentIndex, fullScreen } = this.state;

    return (
      <div className="carousel">
        {fullScreen ? (
          <div className="image-container">
            <img
              src={images[currentIndex].src}
              alt={`Image ${currentIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100vh',
                objectFit: 'cover',
              }}
            />
          </div>
        ) : (
          <div
            ref={(carousel) => {
              this.carousel = carousel;
            }}
            className="carousel carousel-slider"
          >
            {images.map((image, index) => (
              <a key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`} href="#!">
                <div className="carousel-item-inner">
                  <img
                    src={images[index].src}
                    alt={`Image ${index + 1}`}
                    style={{
                      maxWidth: '50%', // Display two images at a time
                      maxHeight: '70vh',
                      objectFit: 'cover',
                    }}
                  />
                  <img
                    src={images[(index + 1) % images.length].src}
                    alt={`Image ${index + 2}`}
                    style={{
                      maxWidth: '50%', // Display two images at a time
                      maxHeight: '70vh',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Image;


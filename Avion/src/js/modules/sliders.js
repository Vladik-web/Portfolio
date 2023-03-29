import Swiper from 'swiper';
const sliders = () => {
  const bannerSlider = document.querySelector('.banner__slider');

  if (bannerSlider) {
    new Swiper(bannerSlider, {
      slidesPerView: 1,
      autoplay: {
        delay: 1000
      }
    });
  }

  const productSlider = document.querySelector('.product__slider');

  if (productSlider) {
    new Swiper(productSlider, {
      slidesPerView: 1,
      speed: 700,
      loop: true
    });
  }
};

export default sliders;

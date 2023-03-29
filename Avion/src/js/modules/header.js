import { disablePageScroll, enablePageScroll, addScrollableSelector } from 'scroll-lock';
const header = () => {
  // calculate header height
  const headerEl = document.querySelector('#header');

  const calcHeight = () => {
    document.documentElement.style.setProperty('--app-header-height', `${headerEl.clientHeight / 16}rem`);
  };
  if (headerEl) {
    calcHeight();
    window.addEventListener('resize', calcHeight);
  }

  // burger

  const headerBurger = document.querySelector('[data-burger]');
  const headerRight = document.querySelector('.header__right');
  const headerClose = document.querySelector('#header-close');

  headerBurger.addEventListener('click', () => {
    headerRight.classList.add('active');
    headerBurger.setAttribute('aria-label', 'Закрыть меню');
    headerBurger.setAttribute('aria-expanded', true);
    disablePageScroll();
    addScrollableSelector('.header__nav');
  });

  headerClose.addEventListener('click', () => {
    headerRight.classList.remove('active');
    headerBurger.setAttribute('aria-label', 'Открыть меню');
    headerBurger.setAttribute('aria-expanded', false);
    enablePageScroll();
  });

  // scroll header

  const setHeaderSmall = () => {
    if (window.scrollY > 0) headerEl.classList.add('header--small');
    else headerEl.classList.remove('header--small');
  };

  const getMedia = () => {
    let mql = window.matchMedia('(max-width: 47.9875em)');

    if (mql.matches) {
      document.addEventListener('scroll', setHeaderSmall);
    } else {
      document.removeEventListener('scroll', setHeaderSmall);
    }
  };

  // window.addEventListener('resize', getMedia);

  // getMedia();

  // banner

  const banner = document.querySelector('#banner');
  const bannerClose = document.querySelector('#banner-close');

  if (banner) {
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
      calcHeight();
    });
  }
};

export default header;

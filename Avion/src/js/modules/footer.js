const footer = () => {
  const footerEl = document.querySelector('#footer');
  if (!footerEl) return;

  const calcHeight = () => {
    document.documentElement.style.setProperty('--app-footer-height', `${footerEl.clientHeight / 16}rem`);
  };
  calcHeight();
  window.addEventListener('resize', calcHeight);
};

export default footer;

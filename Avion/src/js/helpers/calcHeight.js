import getFontSize from '../helpers/getFontSize';

const calcHeight = () => {
  const calculateHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight / getFontSize()}rem`);
  };

  calculateHeight();

  window.addEventListener('resize', calculateHeight);
};

export default calcHeight;

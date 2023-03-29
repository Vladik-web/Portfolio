const getFontSize = () => {
  const el = document.documentElement;
  const fz = window.getComputedStyle(el, null).getPropertyValue('font-size');
  return parseFloat(fz);
};

export default getFontSize;

import { disablePageScroll, enablePageScroll, addScrollableSelector } from 'scroll-lock';
const filters = () => {
  const filterBtn = document.querySelector('#product-filter');
  const aside = document.querySelector('.product-listings__aside');
  const filterCloseButton = document.querySelector('#product-listings-close');
  const productApply = document.querySelector('#product-apply');

  if (!filterBtn) return;

  function closeFilters() {
    aside.classList.remove('active');
    aside.classList.add('close');
    document.body.classList.remove('active');

    setTimeout(() => {
      aside.classList.remove('close');
      enablePageScroll();
    }, 300);
  }

  filterBtn.addEventListener('click', () => {
    aside.classList.add('active');
    document.body.classList.add('active');

    disablePageScroll();
    addScrollableSelector('.product-listings__aside');
  });

  filterCloseButton.addEventListener('click', () => {
    closeFilters();
  });

  aside.addEventListener('click', e => {
    if (!e.target.closest('.product-listings__body')) {
      closeFilters();
    }
  });

  productApply.addEventListener('click', closeFilters);
};

export default filters;

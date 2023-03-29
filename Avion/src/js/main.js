import calcHeight from './helpers/calcHeight';
import header from './modules/header';
import footer from './modules/footer';
import sliders from './modules/sliders';
import filters from './modules/filters';
import cursor from './modules/cursor';

window.addEventListener('DOMContentLoaded', () => {
  cursor();
  calcHeight();
  header();
  sliders();
  footer();
  filters();
});

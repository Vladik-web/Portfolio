import isMobile from '../helpers/isMobile';
const cursor = () => {
  if (isMobile.any()) {
    document.querySelectorAll('.aura, .cursor2').forEach(item => item.remove());
    return;
  }

  const aura = document.querySelector('.aura');
  const cursorPointer = document.querySelector('.cursor2');
  const buttons = document.querySelectorAll('a, button');

  document.addEventListener('pointermove', e => {
    let x = e.clientX;
    let y = e.clientY;
    aura.style.transform = `translate3d(calc(${x / 16}rem - 50%), calc(${y / 16}rem - 50%), 0)`;
    cursorPointer.style.left = `${x / 16}rem`;
    cursorPointer.style.top = `${y / 16}rem`;
  });

  document.addEventListener('mousedown', () => {
    aura.classList.add('click');
    cursorPointer.classList.add('cursorinnerhover');
  });

  document.addEventListener('mouseup', () => {
    aura.classList.remove('click');
    cursorPointer.classList.remove('cursorinnerhover');
  });

  if (buttons.length) {
    buttons.forEach(item => {
      item.addEventListener('mouseover', () => {
        if (item.classList.contains('btn--medium-primary')) aura.classList.add('white');
        aura.classList.add('hover');
      });
      item.addEventListener('mouseleave', () => {
        aura.classList.remove('hover');
        aura.classList.remove('white');
      });
    });
  }
};

export default cursor;

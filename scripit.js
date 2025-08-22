(function () {
  const section  = document.querySelector('#carrossel');
  const articles = Array.from(section.querySelectorAll('article'));
  const prevBtn  = section.querySelector('button:first-of-type');
  const nextBtn  = section.querySelector('button:last-of-type');

  if (!articles.length) return;

  if (!section.style.position) section.style.position = 'relative';

  let currentIndex = 0;
  let isAnimating  = false;

  // Estado inicial
  articles.forEach((a, i) => {
    a.style.transition = 'opacity 800ms ease-in-out'; // mais lento e suave
    a.style.opacity    = i === 0 ? '1' : '0';
    a.style.display    = i === 0 ? 'flex' : 'none';
  });

  function fadeTo(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    const current = articles[currentIndex];
    const next    = articles[newIndex];

    const secRect = section.getBoundingClientRect();
    const curRect = current.getBoundingClientRect();
    const prevPos = current.style.position;

    next.style.display = 'flex';
    next.style.opacity = '0';

    current.style.position = 'absolute';
    current.style.left     = (curRect.left - secRect.left) + 'px';
    current.style.top      = (curRect.top  - secRect.top)  + 'px';
    current.style.width    = curRect.width + 'px';

    requestAnimationFrame(() => {
      current.style.opacity = '0';
      next.style.opacity    = '1';
    });

    const onDone = () => {
      current.removeEventListener('transitionend', onDone);
      current.style.display  = 'none';
      current.style.opacity  = '1';
      current.style.position = prevPos || '';
      current.style.left     = '';
      current.style.top      = '';
      current.style.width    = '';

      currentIndex = newIndex;
      isAnimating  = false;
    };

    current.addEventListener('transitionend', onDone);
  }

  prevBtn.addEventListener('click', () => {
    fadeTo((currentIndex - 1 + articles.length) % articles.length);
  });

  nextBtn.addEventListener('click', () => {
    fadeTo((currentIndex + 1) % articles.length);
  });
})();


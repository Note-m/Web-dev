import Accordion from 'accordion-js';
export function buttonFaq() {
  const blocks = document.querySelectorAll('.accordion-block');

  blocks.forEach(block => {
    const title = block.querySelector('.accordion-title');
    const content = block.querySelector('.accordion-content');
    const span = title.querySelector('span');

    title.addEventListener('click', () => {
      if (!block.classList.contains('active')) {
        blocks.forEach(b => {
          b.classList.remove('active');
          b.querySelector('.accordion-content').classList.remove('active');
          b.querySelector('.accordion-content').style.maxHeight = 0;
          b.querySelector('span svg').style.transform = 'rotate(0deg)';
        });
        block.classList.add('active');
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        span.querySelector('svg').style.transform = 'rotate(180deg)';
      } else {
        block.classList.remove('active');
        content.classList.remove('active');
        content.style.maxHeight = 0;
        span.querySelector('svg').style.transform = 'rotate(0deg)';
      }
    });

    // Open the first accordion block by default
    if (block === blocks[0]) {
      block.classList.add('active');
      content.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
      span.querySelector('svg').style.transform = 'rotate(180deg)';
    }
  });
}

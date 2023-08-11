  let initialHeight = window.innerHeight;

  function adjustExchangePosition() {
    const currentHeight = window.innerHeight;
    const heightDifference = initialHeight - currentHeight;
    const exchangeElement = document.getElementById('exchange');

    if (heightDifference > 0) {
      exchangeElement.style.transform = `translate(0, ${heightDifference}px)`;
    } else {
      exchangeElement.style.transform = 'translate(0, 0)';
    }
  }

  window.addEventListener('resize', adjustExchangePosition);
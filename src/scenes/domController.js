const display = (() => {
  const displayControls = () => {
    const toggleControl = (e) => {
      e.target.parentElement.classList.add('hidden');
      document.querySelector('.gameControls').classList.remove('hidden');
    };
    const showControls = (e) => {
      e.target.parentElement.classList.add('hidden');
      document.getElementById('instructions').classList.remove('hidden');
    };
    const controlButton = document.querySelector('.gameControls');
    const gameControls = document.getElementById('instructions');
    controlButton.addEventListener('click', showControls, false);
    gameControls.addEventListener('click', toggleControl, false);
  };

  const offControl = () => {
    document.querySelector('.gameControls').classList.add('hidden');
  };

  const onControl = () => {
    document.querySelector('.gameControls').classList.remove('hidden');
  };

  return { displayControls, offControl, onControl };
})();

export default display;

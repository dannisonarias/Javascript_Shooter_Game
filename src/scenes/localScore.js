const localScore = (() => {
  const saveScore = (scene) => {
    if (localStorage.getItem('score') === null) {
      localStorage.setItem(
        'score',
        // eslint-disable-next-line
        JSON.stringify(scene.delayLevel - scene.time._active[0].delay)
      );
    }
  };

  const saveName = (user) => {
    if (user === '') {
      user = 'No Name';
    }
    localStorage.setItem('name', user);
  };

  return { saveScore, saveName };
})();

export default localScore;

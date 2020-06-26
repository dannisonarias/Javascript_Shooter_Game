const localScore = (() => {
  const saveScore = (scene) => {
    if (localStorage.getItem("score") === null) {
      localStorage.setItem(
        "score",
        JSON.stringify(scene.delayLevel - scene.time._active[0].delay)
      );
    }
  };
  return { saveScore };
})();

export default localScore;

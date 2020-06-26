const timer = (() => {
  const createTimer = (scene) => {
    scene.timeText = scene.add.text(100, 200);
  };

  const updateText = (scene) => {
    scene.timeText.setText(
      `Level: ${Math.round(scene.delayLevel - scene.time._active[0].delay)}`
    );
  };

  return { updateText, createTimer };
})();

export default timer;

const timer = (() => {
  const createTimer = (scene) => {
    scene.timeText = scene.add.text(15, 15, "", {
      fontFamily: "monospace",
      fontSize: 18,
      fontStyle: "bold",
      color: "#ffffff",
      align: "center",
    });
  };

  const updateText = (scene) => {
    scene.timeText.setText(
      `Your Score: ${Math.round(
        scene.delayLevel - scene.time._active[0].delay
      )}`
    );
  };

  return { updateText, createTimer };
})();

export default timer;

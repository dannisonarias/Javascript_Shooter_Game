const createLeaderBoard = (scene) => {
  scene.add.text(scene.game.config.width * 0.25, 120, 'LEADERBOARD', {
    fontFamily: 'monospace',
    fontSize: 35,
    fontStyle: 'bold',
    color: '#ffffff',
    align: 'center',
  });
  scene.add.text(scene.game.config.width * 0.25, 170, 'RANK', 24);
  scene.add.text(scene.game.config.width * 0.45, 170, 'NAME', 24);
  scene.add.text(scene.game.config.width * 0.65, 170, 'SCORE', 24);
  let rankPosition = 190;
  const scores = JSON.parse(localStorage.scores);
  const { name } = localStorage;
  const newScore = localStorage.score;
  scores.push({ user: name, score: parseInt(newScore, 10) });
  const leaderBoards = scores.sort((a, b) => b.score - a.score);
  for (let i = 0; i < 10; i += 1) {
    const cscore = leaderBoards[i].score;
    const { user } = leaderBoards[i];
    scene.add.text(scene.game.config.width * 0.28, rankPosition, i + 1, 24);
    scene.add.text(scene.game.config.width * 0.45, rankPosition, user, 24);
    scene.add.text(scene.game.config.width * 0.65, rankPosition, cscore, 24);
    rankPosition += 20;
  }
};

export default createLeaderBoard;

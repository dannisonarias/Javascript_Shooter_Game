import axios from "axios";

const Base =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/";
const K = "uesnsdlVyVnHX40MipeX";

const sendScore = () => {
  const { name } = localStorage;
  const { score } = localStorage;
  axios
    .post(`${Base}${K}/scores`, {
      user: name,
      score: parseInt(score, 10),
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.error(err);
    });
};

const allScores = () =>
  axios
    .get(`${Base}${K}/scores`, { mode: "cors" })
    .then((result) => {
      localStorage.scores = JSON.stringify(result.data.result);
    })
    .catch((err) => {
      // eslint-disable-next-line
      console.error(err);
    });

export default { sendScore, allScores };

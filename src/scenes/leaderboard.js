import axios from "axios";
let Base =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/";
let K = "uesnsdlVyVnHX40MipeX";

const sendScore = () => {
  let name = localStorage.name;
  let score = localStorage.score;
  axios
    .post(`${Base}${K}/scores`, {
      user: name,
      score: parseInt(score, 10),
    })
    .catch((err) => {
      alert(`Api Error`);
    });
};
const allScores = async () =>
  axios
    .get(`${Base}${K}/scores`, { mode: "cors" })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      alert(`Api Error`);
    });

export default { sendScore, allScores };

import SceneMain from "../src/scenes/SceneMain";
import gameStart from "./gameMock";

let game;
let player;

beforeEach(() => {
  game = gameStart();
});

describe("test SceneMain", () => {
  test("check for game start", () => {
    expect(typeof game).toBe("object");
  });
});

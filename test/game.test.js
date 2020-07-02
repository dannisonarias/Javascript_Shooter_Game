import gameStart from "./gameMock";

let game;

beforeEach(() => {
  game = gameStart();
});

describe("test game", () => {
  test("check for game start", () => {
    expect(typeof game).toBe("object");
  });

  test("check if all four scenes exist", () => {
    // eslint-disable-next-line
    expect(game.scene._pending.length).toBe(4);
  });

  test("expect scenes not to be less than 1", () => {
    // eslint-disable-next-line
    expect(game.scene._pending.length).toBeGreaterThan(0);
  });
});

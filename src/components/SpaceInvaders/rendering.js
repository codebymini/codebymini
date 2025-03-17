import { GAME_CONFIG } from './constants';

export const renderGame = (gameState) => {
  const {
    boardWidth,
    boardHeight,
    playerChar,
    alienChar,
    bulletChar,
    emptyChar,
  } = GAME_CONFIG;
  const { player, aliens, bullets } = gameState;

  // Create empty board
  const board = Array(boardHeight)
    .fill()
    .map(() => Array(boardWidth).fill(emptyChar));

  // Place player
  board[player.y][player.x] = playerChar;

  // Place aliens
  aliens.forEach((alien) => {
    if (
      alien.y >= 0 &&
      alien.y < boardHeight &&
      alien.x >= 0 &&
      alien.x < boardWidth
    ) {
      board[alien.y][alien.x] = alienChar;
    }
  });

  // Place bullets
  bullets.forEach((bullet) => {
    if (
      bullet.y >= 0 &&
      bullet.y < boardHeight &&
      bullet.x >= 0 &&
      bullet.x < boardWidth
    ) {
      board[bullet.y][bullet.x] = bulletChar;
    }
  });

  // Convert board to string
  return board.map((row) => row.join('')).join('\n');
};

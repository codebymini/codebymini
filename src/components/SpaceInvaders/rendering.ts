import { GameState } from './types';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  PLAYER_CHAR,
  ALIEN_CHAR,
  BULLET_CHAR,
  EMPTY_CHAR,
} from './constants';

export const renderGame = (state: GameState): string => {
  const { player, aliens, bullets, isGameOver, isWin } = state;

  // Create empty board
  const board: string[][] = Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EMPTY_CHAR));

  // Add player (with boundary check)
  const playerX = Math.floor(player.x);
  const playerY = Math.floor(player.y);
  if (
    playerX >= 0 &&
    playerX < BOARD_WIDTH &&
    playerY >= 0 &&
    playerY < BOARD_HEIGHT
  ) {
    board[playerY][playerX] = PLAYER_CHAR;
  }

  // Add aliens (with boundary checks)
  for (const alien of aliens) {
    const alienX = Math.floor(alien.x);
    const alienY = Math.floor(alien.y);
    if (
      alienX >= 0 &&
      alienX < BOARD_WIDTH &&
      alienY >= 0 &&
      alienY < BOARD_HEIGHT
    ) {
      board[alienY][alienX] = ALIEN_CHAR;
    }
  }

  // Add bullets (with boundary checks)
  for (const bullet of bullets) {
    const bulletX = Math.floor(bullet.x);
    const bulletY = Math.floor(bullet.y);
    if (
      bulletX >= 0 &&
      bulletX < BOARD_WIDTH &&
      bulletY >= 0 &&
      bulletY < BOARD_HEIGHT
    ) {
      board[bulletY][bulletX] = BULLET_CHAR;
    }
  }

  // Convert board to string
  const boardString = board.map((row) => row.join('')).join('\n');

  // Add game status
  if (isGameOver) {
    return `${boardString}\n\nGame Over! Press ESC to exit.`;
  }
  if (isWin) {
    return `${boardString}\n\nYou Win! Press ESC to exit.`;
  }

  return boardString;
};

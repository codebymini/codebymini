import { GAME_CONFIG } from './constants';

export const initializeGameState = () => {
  const {
    boardWidth,
    boardHeight,
    alienRows,
    aliensPerRow,
    alienSpacing,
    initialLives,
  } = GAME_CONFIG;

  // Initialize player at bottom center
  const player = {
    x: Math.floor(boardWidth / 2),
    y: boardHeight - 1,
  };

  // Initialize aliens in formation
  const aliens = [];
  for (let row = 0; row < alienRows; row++) {
    for (let col = 0; col < aliensPerRow; col++) {
      aliens.push({
        x: col * alienSpacing + 2,
        y: row * 2 + 1,
      });
    }
  }

  return {
    player,
    aliens,
    bullets: [],
    score: 0,
    lives: initialLives,
    gameOver: false,
    boardWidth,
    boardHeight,
    alienDirection: 1, // 1 for right, -1 for left
  };
};
